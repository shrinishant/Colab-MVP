import { IsNotEmpty, IsDateString } from 'class-validator';
import { CreateActivityDto } from './activity.dto';

export class CreateDayDto {

  dayID: string

  @IsNotEmpty()
  tripID: string

  @IsNotEmpty()
  @IsDateString()
  date: string

  activities: CreateActivityDto[]
}