import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { JwtDto } from '../types/auth.types'
import { UserService } from '../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET,
        })
    }

    async validate(payload: JwtDto) {
        const user = await this.userService.findOne(payload.uid)
        return user
    }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
