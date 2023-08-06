import { Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VotesController],
  providers: [VotesService],
  imports: [PrismaModule]
})
export class VotesModule {}
