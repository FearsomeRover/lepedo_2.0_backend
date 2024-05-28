import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common'
import { OauthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { JwtAuth } from './decorators/JwtAuth.decorator'
import { CurrentUser } from './decorators/CurrentUser.decorator'
import { User } from 'src/user/entities/user.entity'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(OauthGuard)
    @Get('login')
    async loginSso() {
        // guard redirects
    }

    @UseGuards(OauthGuard)
    @Get('callback')
    async callback(@Request() req, @Res() res) {
        const { access_token } = await this.authService.login(req.user)
        const redirectUrl = new URL(process.env.FRONTEND_AUTHORIZED_URL)
        redirectUrl.searchParams.append('access_token', access_token)
        res.redirect(301, redirectUrl.toString())
    }
    @Get('me')
    @JwtAuth()
    me(@CurrentUser() user: User): User {
        return user
    }
}
