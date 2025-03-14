-- DropForeignKey
ALTER TABLE "Road" DROP CONSTRAINT "Road_tripId_fkey";

-- AddForeignKey
ALTER TABLE "Road" ADD CONSTRAINT "Road_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
