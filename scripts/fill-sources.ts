import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let main = async () => {
  await prisma.word.updateMany({
    where: {
      source: null,
    },
    data: {
      sourceId: 1,
    },
  });
};
main();
