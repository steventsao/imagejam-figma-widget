/*
  Warnings:

  - Added the required column `s3Id` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_uploadJobId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "s3Id" INTEGER NOT NULL,
ALTER COLUMN "uploadJobId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_uploadJobId_fkey" FOREIGN KEY ("uploadJobId") REFERENCES "UploadJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_s3Id_fkey" FOREIGN KEY ("s3Id") REFERENCES "s3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
