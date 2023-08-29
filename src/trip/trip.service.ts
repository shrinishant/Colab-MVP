import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

// const v4options = {
//   random: [
//     0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
//   ],
// };

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
export class TripService {

    constructor(private prisma: PrismaService, private config: ConfigService){}

    async create(dto: CreateTripDto){
        try {
            const trip = await this.prisma.trip.create({
                data: {
                  tripID: uuidv4(),
                    tripName: dto.tripName,
                    userID: dto.userID,
                    startDate: dto.startDate,
                    endDate: dto.endDate,
                    destination: dto.destination,
                    description: dto.description
                }
            })

            await this.prisma.user.update({
                where: {
                    userID: dto.userID
                },
                data: {
                    trips: {
                        connect: {
                            tripID: trip.tripID
                        }
                    }
                }
            })

            return trip
        } catch (error) {
            if(error.code === 'P2002') {
                throw new ForbiddenException(
                    'credentials taken'
                )
            }
            throw error
        }
    }

    async getAllTrips(userID: string) {

        const trips = await this.prisma.trip.findMany({
            where: {
                userID: userID,
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
            },
        })

        const tripsWithVoteCounts = trips.map((trip) => ({
          ...trip,
          days: trip.days.map((day) => ({
            ...day,
            activities: day.activities.map((activity) => ({
              ...activity,
              votes: calculateVoteCounts(activity.votes),
            })),
          })),
        }))
        
        return tripsWithVoteCounts
    }

    async getTripsForAnUser(dto) {

      const trip = await this.prisma.trip.findMany({
        where: {
          userID: dto.userID
        },
      })
      
      return trip
  }
}
