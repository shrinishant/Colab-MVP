import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateVoteDto } from 'src/dto/vote.dto';

export class CreateActivityDto {

  activityID: string

  @IsNotEmpty()
  tripID: string

  @IsOptional()
  dayID: string

  @IsOptional()
  day: number

  @IsNotEmpty()
  activityName: string

  @IsNotEmpty()
  location: string

  @IsNotEmpty()
  cost: string

  @IsNotEmpty()
  startTime: string

  @IsNotEmpty()
  endTime: string

  @IsNotEmpty()
  description: string

  votes: CreateVoteDto[]
}