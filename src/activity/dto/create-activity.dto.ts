import { IsNotEmpty } from 'class-validator';
import { CreateVoteDto } from 'src/dto/vote.dto';

export class CreateActivityDto {

  activityID: string

  @IsNotEmpty()
  tripID: string

  @IsNotEmpty()
  dayID: string

  @IsNotEmpty()
  activityName: string

  @IsNotEmpty()
  location: string

  @IsNotEmpty()
  description: string

  votes: CreateVoteDto[]
}