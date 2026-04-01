import { prisma } from "@/app/lib/prisma";
import { signinSchema } from "@/app/lib/validations/auth";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const result = signinSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ message: "Validation failed" }, { status: 400 });
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
    );
  };

  const sessionToken = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  try {
    await prisma.session.create({
        data: {
            token: sessionToken,
            userId: user.id,
            expiresAt,
        }
    })
  } catch (err) {
    return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
    );
  };

  const response = NextResponse.json(
    { message: "Successful sign in" },
    { status: 200 },
  );

  response.cookies.set("sessionToken", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  })

  return response; 
  
}
