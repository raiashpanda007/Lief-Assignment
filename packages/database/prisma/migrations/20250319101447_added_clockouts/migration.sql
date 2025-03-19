-- CreateTable
CREATE TABLE "ClockOutRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ClockOutRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClockOutRecord" ADD CONSTRAINT "ClockOutRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Worker"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
