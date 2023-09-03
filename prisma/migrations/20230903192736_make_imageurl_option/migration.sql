/*
  Warnings:

  - Added the required column `url` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Swing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_swingId_fkey";

-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "swingId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Swing" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_swingId_fkey" FOREIGN KEY ("swingId") REFERENCES "Swing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
