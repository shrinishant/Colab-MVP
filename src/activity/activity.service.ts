import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ActivityService {
    constructor(private prisma: PrismaService){}

    async create(dto: CreateActivityDto){
        try {
            const activity = await this.prisma.activity.create({
                data: {
                    activityID: uuidv4(),
                    tripID: dto.tripID,
                    dayID: dto.dayID,
                    activityName: dto.activityName,
                    location: dto.location,
                    description: dto.description,
                }
            })

            return activity
        } catch (error) {
            if(error.code === 'P2002') {
                throw new ForbiddenException(
                    'credentials taken'
                )
            }
            throw error
        }
    }

    async getAllForATrip(tripID: string){
        try {
            const activities = await this.prisma.activity.findMany({
                where: {
                    tripID: tripID,
                  },
              include: {
                votes: true
              },
            })
        
            return activities
        } catch (error) {
            throw error
        }
    }
}
