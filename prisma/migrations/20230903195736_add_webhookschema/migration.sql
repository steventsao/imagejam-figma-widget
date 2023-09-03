-- CreateTable
CREATE TABLE "ReplicateWebhook" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payload" JSONB NOT NULL,

    CONSTRAINT "ReplicateWebhook_pkey" PRIMARY KEY ("id")
);
