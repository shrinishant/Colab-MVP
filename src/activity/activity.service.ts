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
            var d;

            if (!dto.dayID) {
                if(dto.day){
                    const days = await this.prisma.day.findFirst({
                        where: {
                            tripID: dto.tripID,
                            day: dto.day
                        },
                        include: {
                            activities: true
                        }
                    })

                    if(days){
                        // console.log(days, "days")
                        d = days
                    }else{
                        d = await this.prisma.day.create({
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
                }else{
                    d = await this.prisma.day.create({
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
            }

            const activity = await this.prisma.activity.create({
                data: {
                    activityID: uuidv4(),
                    tripID: dto.tripID,
                    dayID: dto?.dayID ? dto?.dayID : d?.dayID,
                    activityName: dto.activityName,
                    location: dto.location,
                    cost: dto.cost,
                    startTime: dto.startTime,
                    endTime: dto.endTime,
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

    async getActivitiesPerTrip(dto){
        try {
            const activities = await this.prisma.trip.findMany({
                where: {
                  userID: dto.userID,
                  tripID: dto.tripID
                },
                include: {
                  days: {
                    include: {
                      activities: {
                        include: {
                          votes: true,
                        },
                      },
                    },
                  },
                }
            })

            const formattedTrips = activities.map((trip) => ({
                tripID: trip.tripID,
                userID: trip.userID,
                tripName: trip.tripName,
                startDate: trip.startDate,
                endDate: trip.endDate,
                destination: trip.destination,
                days: trip.days.map((day) => ({
                  dayID: day.dayID,
                  day: day.day,
                  tripID: day.tripID,
                  date: day.date,
                  activities: day.activities.map((activity) => ({
                    activityID: activity.activityID,
                    tripID: activity.tripID,
                    dayID: activity.dayID,
                    activityName: activity.activityName,
                    location: activity.location,
                    cost: activity.cost,
                    startTime: activity.startTime,
                    endTime: activity.endTime,
                    description: activity.description,
                    votes: {
                        interested: activity.votes.filter((vote) => vote.voteType === 'interested').length,
                        notInterested: activity.votes.filter((vote) => vote.voteType === 'notInterested').length,
                        maybe: activity.votes.filter((vote) => vote.voteType === 'maybe').length,
                      },
                  })),
                })),
            }))
          
            return formattedTrips
        } catch (error) {
            console.log(error)
            throw new ForbiddenException(
                'No Trips found'
            )
        }
    }

    async fakeAPI(){
        return {
            "msg":"fake response"
        }
    }
}
