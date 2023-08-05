import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTripDto {

  tripID: string

  @IsNotEmpty()
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
}





