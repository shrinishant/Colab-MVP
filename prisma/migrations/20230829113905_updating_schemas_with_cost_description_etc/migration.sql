-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "cost" TEXT NOT NULL DEFAULT '$ 9.53',
ADD COLUMN     "endTime" TEXT NOT NULL DEFAULT '7 pm',
ADD COLUMN     "startTime" TEXT NOT NULL DEFAULT '6 pm';

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'This is a default description';
