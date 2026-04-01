import { prisma } from "@/app/lib/prisma";
import { signupSchema } from "@/app/lib/validations/auth";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const result = signupSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        fields: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, phone, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "user already exist" },
      { status: 409 },
    );
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      password: hashed,
    },
  });

  const sessionToken = randomUUID();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // a week

  try {
    await prisma.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expiresAt,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server crash" },
      { status: 500 },
    );
  }

  const response = NextResponse.json(
    {
      message: "User created",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      },
    },
    { status: 201 },
  );

  response.cookies.set("sessionToken", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return response;
}
