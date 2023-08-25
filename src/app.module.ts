import { Module } from '@nestjs/common';
import { TripModule } from './trip/trip.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { VotesModule } from './votes/votes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TripModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), ActivityModule, VotesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
