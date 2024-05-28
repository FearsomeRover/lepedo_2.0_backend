import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class OauthGuard extends AuthGuard('auth0') {}

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {
    handleRequest<UserEntity>(_: any, user: UserEntity): UserEntity {
        return user
    }
}
