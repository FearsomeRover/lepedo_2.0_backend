export type Auth0Profile = {
    sub: string
    given_name: string
    family_name: string
    nickname: string
    name: string
    picture: string
    locale: string
    updated_at: string
    email: string
    email_verified: boolean
}
export type JwtDto = {
    iat: number
    exp: number
} & JwtUser
export type JwtUser = {
    username: string
    uid: string
}
