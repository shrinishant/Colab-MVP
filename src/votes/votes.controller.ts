import { Body, Controller, Post } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/vote.dto';

@Controller('votes')
export class VotesController {
    constructor(private voteService: VotesService){}

    @Post('/createVote')
    vote(@Body() dto: CreateVoteDto){
        return this.voteService.vote(dto)
    }

    @Post('/updateVote')
    updateVote(@Body() dto : {
        userID: string, 
        activityID: string,
        voteType: string
    }){
        return this.voteService.upDateVote(dto)
    }
}