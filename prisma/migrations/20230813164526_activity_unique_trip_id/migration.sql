/*
  Warnings:

  - A unique constraint covering the columns `[tripID]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Activity_tripID_key" ON "Activity"("tripID");
