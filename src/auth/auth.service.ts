import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}
    async login(user: User) {
        const payload = { username: user.name, uid: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
