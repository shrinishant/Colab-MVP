/*
  Warnings:

  - A unique constraint covering the columns `[activityID,userID]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_activityID_userID_key" ON "Vote"("activityID", "userID");
