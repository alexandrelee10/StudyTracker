import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}
// The adapter is how Prisma talks to Postgres // Where the db url is
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed...");

  const hashed = await bcrypt.hash("admin123", 10);

  const user = await prisma.user.create({
    data: {
      firstName: "Alex",
      lastName: "Lee",
      phone: "9548048498",
      email: "alex@example.com",
      password: hashed,
    },
  });

  console.log("User created:", user.firstName);

  const result = await prisma.studySession.createMany({
    data: [
      {
        courseId: "COP 2210",
        title: "Programming I",
        duration: 0,
        userId: user.id,
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });