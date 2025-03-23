/*
  Warnings:

  - You are about to drop the column `teamSize` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the `Hospital` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `Manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `radius` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "teamSize",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "radius" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Hospital";
