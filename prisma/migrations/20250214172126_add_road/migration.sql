/*
  Warnings:

  - A unique constraint covering the columns `[roadId]` on the table `Step` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "roadId" TEXT;

-- CreateTable
CREATE TABLE "Road" (
    "id" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "polyline" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,

    CONSTRAINT "Road_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Road_id_key" ON "Road"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Road_stepId_key" ON "Road"("stepId");

-- CreateIndex
CREATE UNIQUE INDEX "Step_roadId_key" ON "Step"("roadId");

-- AddForeignKey
ALTER TABLE "Road" ADD CONSTRAINT "Road_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
