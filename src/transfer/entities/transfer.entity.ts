import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, IsUUID, Max, Min, isPositive, isUUID } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class Transfer {
    @IsUUID()
    id: string

    @IsNotEmpty()
    title: string

    @IsDateString()
    @IsNotEmpty()
    date: string

    @IsNotEmpty()
    @IsUUID()
    userFromId: string

    @IsNotEmpty()
    @IsUUID()
    userToId: string

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    amount: number
}
