import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { v4 as uuidv4 } from 'uuid'

function calculateVoteCounts(votes) {
    const initialCounts = {
      interested: 0,
      notInterested: 0,
      maybe: 0,
    };
  
    return votes.reduce((counts, vote) => {
      counts[vote.voteType]++;
      return counts;
    }, initialCounts);
}

@Injectable()
export class ActivityService {
    constructor(private prisma: PrismaService){}

    async create(dto: CreateActivityDto){
        try {

            if (!dto.dayID) {
                var d = await this.prisma.day.create({
                    data: {
                        dayID: uuidv4(),
                        day: dto.day,
                        date: new Date(),
                        trip: {
                            connect: { 
                                tripID: dto.tripID
                            }
                        }
                    }
                });
            }

            const activity = await this.prisma.activity.create({
                data: {
                    activityID: uuidv4(),
                    tripID: dto.tripID,
                    dayID: dto?.dayID ? dto?.dayID : d?.dayID,
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

    async getAllForATrip(dto){
        try {
            const activities = await this.prisma.activity.findMany({
                where: {
                    tripID: dto.tripID,
                  },
              include: {
                votes: true
              },
            })

            const activitiesWithCounts = activities.map((activity) => ({
                ...activity,
                votes: activity.votes.reduce(
                  (voteCounts, vote) => {
                    voteCounts[vote.voteType] += 1;
                    return voteCounts;
                  },
                  { interested: 0, notInterested: 0, maybe: 0 }
                ),
              }))
        
            return activitiesWithCounts
        } catch (error) {
            throw error
        }
    }
}
