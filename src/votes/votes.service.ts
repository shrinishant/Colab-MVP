import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVoteDto } from './dto/vote.dto';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class VotesService {
    constructor(private prisma: PrismaService){}

    async vote(dto: CreateVoteDto){
        try {

            const alreadyVoted = await this.prisma.vote.findUnique({
                where : {
                    activityID_userID: {
                      activityID: dto.activityID,
                      userID: dto.userID
                    }
                },
            })

            if(!alreadyVoted){
                const vote = await this.prisma.vote.create({
                    data: {
                        voteID: uuidv4(),
                        activityID: dto.activityID,
                        userID: dto.userID,
                        voteType: dto.voteType
                    }
                })
                return vote
            }else{
                return {
                    data: "Already voted"
                }
            }

        } catch (error) {
            if(error.code === 'P2002') {
                throw new ForbiddenException(
                    'credentials taken'
                )
            }
            throw error
        }
    }

    async upDateVote(dto){
        try {
            const activity = await this.prisma.vote.findUnique({
                where : {
                    activityID_userID: {
                      activityID: dto.activityID,
                      userID: dto.userID
                    }
                },
            })

            if(activity){
                const update = await this.prisma.vote.update({
                    where : {
                        activityID_userID: {
                          activityID: dto.activityID,
                          userID: dto.userID
                        }
                    },
                    data : {
                        voteType: dto.voteType
                    }
                })

                return true
            }else{
                return {
                    data: "First Vote to Update"
                }
            }
        } catch (error) {
            throw error
        }

        return false
    }
}
