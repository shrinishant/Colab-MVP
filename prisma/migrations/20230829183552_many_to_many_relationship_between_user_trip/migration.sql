-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_userID_fkey";

-- CreateTable
CREATE TABLE "TripUser" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "tripID" TEXT NOT NULL,

    CONSTRAINT "TripUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripUser_userID_tripID_key" ON "TripUser"("userID", "tripID");

-- AddForeignKey
ALTER TABLE "TripUser" ADD CONSTRAINT "TripUser_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripUser" ADD CONSTRAINT "TripUser_tripID_fkey" FOREIGN KEY ("tripID") REFERENCES "Trip"("tripID") ON DELETE RESTRICT ON UPDATE CASCADE;
