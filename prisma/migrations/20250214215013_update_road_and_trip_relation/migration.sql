/*
  Warnings:

  - Added the required column `tripId` to the `Road` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Road" ADD COLUMN     "tripId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Road" ADD CONSTRAINT "Road_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
