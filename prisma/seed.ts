import { PrismaClient } from "../lib/generated/prisma/client";

const prisma = new PrismaClient();

const members = [
  {
    email: "beadskode@gmail.com",
    nickname: "Beadskode",
    avatar: "https://avatars.githubusercontent.com/u/5843964?v=4",
  },
  {
    email: "beadskode+01@gmail.com",
    nickname: "Biko",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIXMQz3s5gQdKrno8qArpiiJ3trUHbnVM0gTw58wMDxRa-ljySL=s96-c",
  },
  {
    email: "go.go.ahyeong@gmail.com",
    nickname: "Kay",
    pw: "$2b$10$zbmpxOaO4jroF9Mmrt2M8u6TWXms1/ncqJysXXOyD69aYqPaf44jG",
  },
];

async function main() {
  for (const member of members) {
    const rs = await prisma.member.upsert({
      where: { email: member.email },
      update: {},
      create: { ...member },
    });
    console.log("🚀 ~ rs:", rs);
  }
}

main()
  .catch(async (e) => {
    console.error("Prisma Error >", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.error("Prisma Closed!");
  });
