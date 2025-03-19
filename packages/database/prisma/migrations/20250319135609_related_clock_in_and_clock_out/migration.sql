/*
  Warnings:

  - A unique constraint covering the columns `[clockInId]` on the table `ClockOutRecord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clockInId` to the `ClockOutRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClockInRecord" ADD COLUMN     "clockOutId" TEXT;

-- AlterTable
ALTER TABLE "ClockOutRecord" ADD COLUMN     "clockInId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ClockOutRecord_clockInId_key" ON "ClockOutRecord"("clockInId");

-- AddForeignKey
ALTER TABLE "ClockOutRecord" ADD CONSTRAINT "ClockOutRecord_clockInId_fkey" FOREIGN KEY ("clockInId") REFERENCES "ClockInRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
