-- CreateTable
CREATE TABLE "PredictionImage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "predictionId" INTEGER NOT NULL,

    CONSTRAINT "PredictionImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PredictionImage" ADD CONSTRAINT "PredictionImage_predictionId_fkey" FOREIGN KEY ("predictionId") REFERENCES "Prediction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
