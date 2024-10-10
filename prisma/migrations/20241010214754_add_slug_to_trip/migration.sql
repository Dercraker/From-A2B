/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trip_slug_key" ON "Trip"("slug");
