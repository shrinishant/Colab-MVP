import { IsNotEmpty } from 'class-validator';

export class CreateVoteDto {

  voteID: string

  @IsNotEmpty()
  activityID: string

  @IsNotEmpty()
  userID: string

  @IsNotEmpty()
  voteType: string
}