-- AlterTable
ALTER TABLE "s3" ADD COLUMN     "framesId" INTEGER;

-- CreateTable
CREATE TABLE "Frames" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,
    "s3Id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Frames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Frames_s3Id_key" ON "Frames"("s3Id");

-- CreateIndex
CREATE UNIQUE INDEX "Frames_key_key" ON "Frames"("key");

-- AddForeignKey
ALTER TABLE "Frames" ADD CONSTRAINT "Frames_s3Id_fkey" FOREIGN KEY ("s3Id") REFERENCES "s3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
