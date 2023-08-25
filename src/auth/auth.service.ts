import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from 'uuid';
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password)

        try {
            const user = await this.prisma.user.create({
                data: {
                    userID: uuidv4(),
                    email: dto.email,
                    password: hash,
                    name: dto.name
                }
            })
    
            delete user.password
    
            return this.signToken(user.userID, user.email)
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException(
                  'Credentials taken',
                );
              }
            throw error;
          }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        

        if(!user) throw new ForbiddenException("Email doesn't exist!")

        const passMatch = await argon.verify(
            user.password,
            dto.password
        )

        if(!passMatch) throw new ForbiddenException("Password doesn't match!")

        return this.signToken(user.userID, user.email)
    }

    async getProfile(dto){
        const detials = await this.verifyJwt(dto.token)

        if(detials){
            const user = await this.prisma.user.findUnique({
                where: {
                    email: detials.email
                },
                select: {
                    userID: true,
                    email: true,
                    name: true
                  },
            })

            return user
        }else{
            return {
                status: "invalid token"
            }
        }
    }

    async signToken(userId: string, email: string) : Promise<{access_token: string}> {
        const payload = {
            sub : userId,
            email
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '7d',
            secret: this.config.get('JWT_SECRET_KEY')
        })

        return {
            access_token: token
        }
    }

    async verifyJwt(token: string){
        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret: this.config.get('JWT_SECRET_KEY'),
            })
    
            console.log(payload)
            return payload
        } catch (error) {
            throw new ForbiddenException("Invalid Token")
        }
    }
}