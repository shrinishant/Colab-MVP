import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [PrismaModule]
})
export class TripModule {}
