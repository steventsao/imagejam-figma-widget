/*
  Warnings:

  - Made the column `replicate_prediction_id` on table `Prediction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Prediction" ALTER COLUMN "replicate_prediction_id" SET NOT NULL;
