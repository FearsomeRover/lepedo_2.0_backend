import { IsNotEmpty, IsOptional, IsPositive, IsUUID } from 'class-validator'
import { BasicUserDto } from 'src/user/dto/BasicUser.dto'
import { User } from 'src/user/entities/user.entity'

export class Qr {
    @IsUUID()
    id: string

    @IsNotEmpty()
    title: string

    @IsPositive()
    @IsNotEmpty()
    amount: number

    @IsOptional()
    payTo?: BasicUserDto
}
