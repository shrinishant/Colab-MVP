import { Body, Controller, Get, Post } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';

@Controller('trip')
export class TripController {
    constructor(private tripService: TripService){}

    @Post('create')
    create(@Body() dto: CreateTripDto){
        return this.tripService.create(dto)
    }

    @Get('getTrips')
    getAllTrips(userID: string){
        return this.tripService.getAllTrips(userID)
    }

    @Get('getTripsByUser')
    getTripsForAnUser(@Body() dto: {
        userID: string
    }){
        return this.tripService.getTripsForAnUser(dto)
    }
}
