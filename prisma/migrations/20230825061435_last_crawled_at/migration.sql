/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Source` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "lastCrawledAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");
