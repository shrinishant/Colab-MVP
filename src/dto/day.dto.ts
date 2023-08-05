import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';
import { CreateActivityDto } from './activity.dto';

export class CreateDayDto {

  dayID: string

  @IsNotEmpty()
  @IsInt()
  day: number

  @IsNotEmpty()
  tripID: string


  @IsNotEmpty()
  @IsDateString()
  date: string

  activities: CreateActivityDto[]
}