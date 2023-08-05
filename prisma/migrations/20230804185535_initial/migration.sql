-- CreateTable
CREATE TABLE "Trip" (
    "tripID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "tripName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("tripID")
);

-- CreateTable
CREATE TABLE "Day" (
    "dayID" SERIAL NOT NULL,
    "tripID" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("dayID")
);

-- CreateTable
CREATE TABLE "Activity" (
    "activityID" SERIAL NOT NULL,
    "dayID" INTEGER NOT NULL,
    "activityName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityID")
);

-- CreateTable
CREATE TABLE "Vote" (
    "voteID" SERIAL NOT NULL,
    "activityID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "voteType" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("voteID")
);

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_tripID_fkey" FOREIGN KEY ("tripID") REFERENCES "Trip"("tripID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_dayID_fkey" FOREIGN KEY ("dayID") REFERENCES "Day"("dayID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_activityID_fkey" FOREIGN KEY ("activityID") REFERENCES "Activity"("activityID") ON DELETE RESTRICT ON UPDATE CASCADE;
