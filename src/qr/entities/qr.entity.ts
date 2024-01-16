import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class Qr {
    @IsUUID()
    id: string

    @IsPositive()
    @IsNotEmpty()
    amount: number

    @IsNotEmpty()
    @IsUUID()
    payToId: string
}
