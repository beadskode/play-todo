import { PrismaClient } from "@/lib/generated/prisma/client";

const newInstance = () => new PrismaClient();

// biome-ignore lint/suspicious/noShadowRestrictedNames: for too many connections problems
declare const globalThis: {
  prismaGlobal: ReturnType<typeof newInstance>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? newInstance();

export default prisma;
globalThis.prismaGlobal = prisma;
