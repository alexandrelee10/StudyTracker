import { prisma } from "../app/lib/prisma"
import bcrypt from "bcryptjs";

async function main() {
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

  console.log("User created")

  const session = await prisma.studySession.createMany({
    data: [
      {
        courseId: "COP 2210",
        title: "Programming I",
        duration: 0,
        userId: user.id,
      },
    ],
  });
}
console.log("Session created")

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
