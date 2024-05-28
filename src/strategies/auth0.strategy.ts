import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import axios from 'axios'
import { Strategy } from 'passport-oauth2'

import { Auth0Profile } from '../types/auth.types'
import { UserService } from 'src/user/user.service'

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
    constructor(private userService: UserService) {
        super({
            authorizationURL: `${process.env.OAUTH_BASE_URL}/authorize`,
            tokenURL: `${process.env.OAUTH_BASE_URL}/oauth/token`,
            clientID: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            profileURL: `${process.env.OAUTH_BASE_URL}/userinfo`,
            scope: ['profile', 'openid', 'email'],
            callbackURL: process.env.OAUTH_REDIRECT_URI,
        })
    }

    async validate(accessToken: string) {
        const profile = await this.fetchProfile(accessToken)
        const user = await this.userService.getUserByAuthId(profile.sub)
        if (!user) {
            return await this.userService.createUserForAuth0User(profile)
        }
        return user
    }

    async fetchProfile(accessToken: string) {
        const url = new URL(process.env.OAUTH_BASE_URL + '/userinfo')
        const response = await axios.get<Auth0Profile>(url.toString(), {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return response.data
    }
}
