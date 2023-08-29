import { ActivityService } from './activity.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('activity')
export class ActivityController {
    constructor(private activityService: ActivityService){}

    @Post('create')
    create(@Body() dto: CreateActivityDto){
        return this.activityService.create(dto)
    }

    @Get('getActivities')
    getAllForATrip(@Query() dto: {
        tripID: string
    }){
        return this.activityService.getAllForATrip(dto)
    }

    @Get('trip')
    getActivitiesPerTrip(@Body() dto : {
        tripID: string,
        userID: string
    }){
        return this.activityService.getActivitiesPerTrip(dto)
    }

    @Get('/fake')
    fakeAPI(){
        return this.activityService.fakeAPI()
    }
}
