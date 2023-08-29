import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
                userID: dto.userID,
                tripName: dto.tripName,
                startDate: dto.startDate,
                endDate: dto.endDate,
                destination: dto.destination,
                description: dto.description,
                tripUsers: {
                    create: {
                        user: { connect: { userID: dto.userID } }
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

      const user = await this.prisma.user.findUnique({
        where: {
          userID: dto.userID,
        },
        include: {
          trips: true,
        },
      })

      if(user){
        const tripIDs = user.trips.map(trip => trip.tripID);

        const trips = await this.prisma.trip.findMany({
          where: {
            tripID: {
              in: tripIDs,
            },
          },
        });

        return trips
      }else{
        throw new ForbiddenException("User not found")
      }
  }

  async editTrip(dto){
    try {
        const updatedTrip = await this.prisma.trip.update({
            where: {
                tripID: dto.tripID
            },
            data: {
                tripName: dto.tripName,
                startDate: dto.startDate,
                endDate: dto.endDate,
                destination: dto.destination,
                description: dto.description
            }
        })

        if(updatedTrip){
          return updatedTrip;
        }else{
          return {
            "error": "Trip not found"
          }
        }

    } catch (error) {
        throw error;
    }
  }

  async deleteTrip(dto) {
    try {
        const trip = await this.prisma.trip.findUnique({
            where: {
                tripID: dto.tripID
            }
        });

        if (!trip) {
            throw new NotFoundException(`Trip with ID ${dto.tripID} not found`);
        }

        const deletedTrip = await this.prisma.trip.delete({
            where: {
                tripID: dto.tripID
            }
        });

        return {
          "msg": "deleted successfully"
        };
    } catch (error) {
        throw error;
    }
  }

  async shareTrip(dto){
    try {
      const trip = await this.prisma.trip.findUnique({
          where: {
              tripID: dto.tripID
          }
      });

      if (!trip) {
          throw new NotFoundException(`Trip with ID ${dto.tripID} not found`);
      }

      const alreadyJoined = await this.prisma.user.findUnique({
        where: {
          userID: dto.userID
        },
        include: {
          trips: {
            where: {
              tripID: dto.tripID
            }
          }
        }
      })

      if(alreadyJoined.trips.length > 0){
        throw new ForbiddenException("Already Joined")
      }

      await this.prisma.user.update({
        where: {
            userID: dto.userID
        },
        data: {
          trips: {
            create: {
              tripID: dto.tripID
            }
          }
        }
      })  

      return {
        "msg": "joined success"
      }
    } catch (error) {
      throw error;
    }
  }

  async exitTrip(dto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          userID: dto.userID,
        },
        data: {
          trips: {
            deleteMany: {
              tripID: dto.tripID
            }
          },
        },
      });
  
      return user;
    } catch (error) {
      throw error;
    }
  }
}
