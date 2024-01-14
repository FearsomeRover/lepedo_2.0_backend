import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class User {
    @IsUUID()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    revTag: string

    @IsString()
    @IsNotEmpty()
    color: string
}
