-- DropForeignKey
ALTER TABLE "s3" DROP CONSTRAINT "s3_uploadJobId_fkey";

-- AddForeignKey
ALTER TABLE "UploadJob" ADD CONSTRAINT "UploadJob_s3Id_fkey" FOREIGN KEY ("s3Id") REFERENCES "s3"("id") ON DELETE SET NULL ON UPDATE CASCADE;
