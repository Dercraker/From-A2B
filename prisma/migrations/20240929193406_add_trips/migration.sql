-- CreateEnum
CREATE TYPE "TransportMode" AS ENUM ('Walk', 'Bike', 'Car', 'Boat', 'Plane');

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "placeId" TEXT NOT NULL DEFAULT '',
    "transportMode" "TransportMode" NOT NULL DEFAULT 'Car',

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trip_id_key" ON "Trip"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Step_id_key" ON "Step"("id");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
