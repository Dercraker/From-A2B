-- DropForeignKey
ALTER TABLE "Road" DROP CONSTRAINT "Road_stepId_fkey";

-- DropForeignKey
ALTER TABLE "Road" DROP CONSTRAINT "Road_tripId_fkey";

-- AddForeignKey
ALTER TABLE "Road" ADD CONSTRAINT "Road_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Road" ADD CONSTRAINT "Road_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
