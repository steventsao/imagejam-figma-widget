/*
  Warnings:

  - Made the column `url` on table `s3` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "s3" ALTER COLUMN "url" SET NOT NULL;
