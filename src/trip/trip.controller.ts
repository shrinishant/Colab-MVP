import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
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

    @Put('/edit')
    editTrip(@Body() dto: {
        tripID: string,
        tripName: string,
        startDate: string,
        endDate: string,
        destination: string,
        description: string
    }){
        return this.tripService.editTrip(dto)
    }

    @Delete('/delete')
    deleteTrip(@Body() dto: {
        tripID: string
    }){
        return this.tripService.deleteTrip(dto)
    }

    @Put('/join')
    shareTrip(@Body() dto: {
        tripID: string,
        userID: string
    }){
        return this.tripService.shareTrip(dto)
    }

    @Put("/exit")
    exutTrip(@Body() dto: {
        userID: string,
        tripID: string
    }){
        return this.tripService.exitTrip(dto)
    }
}
