-- CreateTable
CREATE TABLE "s3" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,
    "swingId" INTEGER,

    CONSTRAINT "s3_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "s3_key_key" ON "s3"("key");

-- CreateIndex
CREATE UNIQUE INDEX "s3_swingId_key" ON "s3"("swingId");

-- AddForeignKey
ALTER TABLE "s3" ADD CONSTRAINT "s3_swingId_fkey" FOREIGN KEY ("swingId") REFERENCES "Swing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
