/*
  Warnings:

  - A unique constraint covering the columns `[uploadJobId]` on the table `s3` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "s3" ADD COLUMN     "uploadJobId" INTEGER;

-- CreateTable
CREATE TABLE "UploadJob" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "s3Id" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UploadJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UploadJob_s3Id_key" ON "UploadJob"("s3Id");

-- CreateIndex
CREATE UNIQUE INDEX "UploadJob_userId_key" ON "UploadJob"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "s3_uploadJobId_key" ON "s3"("uploadJobId");

-- AddForeignKey
ALTER TABLE "UploadJob" ADD CONSTRAINT "UploadJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s3" ADD CONSTRAINT "s3_uploadJobId_fkey" FOREIGN KEY ("uploadJobId") REFERENCES "UploadJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;
