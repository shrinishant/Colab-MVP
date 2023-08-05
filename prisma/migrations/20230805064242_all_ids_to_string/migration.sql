/*
  Warnings:

  - The primary key for the `Activity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Day` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Trip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[activityID]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dayID]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dayID]` on the table `Day` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tripID]` on the table `Day` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tripID]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voteID]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activityID]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_dayID_fkey";

-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_tripID_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_activityID_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_pkey",
ALTER COLUMN "activityID" DROP DEFAULT,
ALTER COLUMN "activityID" SET DATA TYPE TEXT,
ALTER COLUMN "dayID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityID");
DROP SEQUENCE "Activity_activityID_seq";

-- AlterTable
ALTER TABLE "Day" DROP CONSTRAINT "Day_pkey",
ALTER COLUMN "dayID" DROP DEFAULT,
ALTER COLUMN "dayID" SET DATA TYPE TEXT,
ALTER COLUMN "tripID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Day_pkey" PRIMARY KEY ("dayID");
DROP SEQUENCE "Day_dayID_seq";

-- AlterTable
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_pkey",
ALTER COLUMN "tripID" DROP DEFAULT,
ALTER COLUMN "tripID" SET DATA TYPE TEXT,
ALTER COLUMN "userID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("tripID");
DROP SEQUENCE "Trip_tripID_seq";

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
ALTER COLUMN "voteID" DROP DEFAULT,
ALTER COLUMN "voteID" SET DATA TYPE TEXT,
ALTER COLUMN "activityID" SET DATA TYPE TEXT,
ALTER COLUMN "userID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("voteID");
DROP SEQUENCE "Vote_voteID_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Activity_activityID_key" ON "Activity"("activityID");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_dayID_key" ON "Activity"("dayID");

-- CreateIndex
CREATE UNIQUE INDEX "Day_dayID_key" ON "Day"("dayID");

-- CreateIndex
CREATE UNIQUE INDEX "Day_tripID_key" ON "Day"("tripID");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_tripID_key" ON "Trip"("tripID");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_userID_key" ON "Trip"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voteID_key" ON "Vote"("voteID");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_activityID_key" ON "Vote"("activityID");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userID_key" ON "Vote"("userID");

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_tripID_fkey" FOREIGN KEY ("tripID") REFERENCES "Trip"("tripID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_dayID_fkey" FOREIGN KEY ("dayID") REFERENCES "Day"("dayID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_activityID_fkey" FOREIGN KEY ("activityID") REFERENCES "Activity"("activityID") ON DELETE RESTRICT ON UPDATE CASCADE;
