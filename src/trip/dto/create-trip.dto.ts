import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';
import { CreateDayDto } from 'src/dto/day.dto';

export class CreateTripDto {

  tripID: string

  @IsNotEmpty()
  @IsInt()
  userID: string

  @IsNotEmpty()
  tripName: string

  @IsNotEmpty()
  @IsDateString()
  startDate: string

  @IsNotEmpty()
  @IsDateString()
  endDate: string

  @IsNotEmpty()
  destination: string

  days: CreateDayDto[]
}