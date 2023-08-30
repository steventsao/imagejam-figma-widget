/*
  Warnings:

  - A unique constraint covering the columns `[objectId]` on the table `Source` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "objectId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Source_objectId_key" ON "Source"("objectId");
