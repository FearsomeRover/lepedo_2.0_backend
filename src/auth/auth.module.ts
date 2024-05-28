import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Auth0Strategy } from '../strategies/auth0.strategy'
import { JwtStrategy } from '../strategies/jwt.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: process.env.SECRET,
                    signOptions: {
                        expiresIn: process.env.EXPIRATION,
                    },
                }
            },
        }),
    ],
    providers: [AuthService, JwtStrategy, Auth0Strategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
