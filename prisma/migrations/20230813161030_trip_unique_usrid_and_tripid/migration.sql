/*
  Warnings:

  - A unique constraint covering the columns `[userID,tripID]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trip_userID_tripID_key" ON "Trip"("userID", "tripID");
