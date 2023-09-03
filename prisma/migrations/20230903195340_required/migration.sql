/*
  Warnings:

  - Made the column `swingId` on table `Prediction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_swingId_fkey";

-- AlterTable
ALTER TABLE "Prediction" ALTER COLUMN "swingId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_swingId_fkey" FOREIGN KEY ("swingId") REFERENCES "Swing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
