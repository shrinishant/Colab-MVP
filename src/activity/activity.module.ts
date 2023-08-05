import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
  imports: [PrismaModule]
})
export class ActivityModule {}
