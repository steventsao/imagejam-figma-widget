import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let main = async () => {
  await prisma.word.updateMany({
    where: {
      sourceId: undefined,
    },
    data: {
      sourceId: 1,
    },
  });
};
main();
