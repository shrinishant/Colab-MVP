/*
  Warnings:

  - Added the required column `tripID` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Activity_dayID_key";

-- DropIndex
DROP INDEX "Day_tripID_key";

-- DropIndex
DROP INDEX "Trip_userID_key";

-- DropIndex
DROP INDEX "Vote_activityID_key";

-- DropIndex
DROP INDEX "Vote_userID_key";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "tripID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "day" INTEGER NOT NULL;
