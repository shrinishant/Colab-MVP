import { Module } from '@nestjs/common';
import { TripModule } from './trip/trip.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [TripModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), ActivityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
