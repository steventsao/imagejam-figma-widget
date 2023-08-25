/*
  Warnings:

  - Made the column `sourceId` on table `Word` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_sourceId_fkey";

-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "sourceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
