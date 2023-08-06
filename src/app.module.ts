import { Module } from '@nestjs/common';
import { TripModule } from './trip/trip.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [TripModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), ActivityModule, VotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
