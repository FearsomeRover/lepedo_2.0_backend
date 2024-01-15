import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { Expense } from 'src/expense/entities/expense.entity'
import { Participant } from 'src/participant/entities/participant.entity'
import { Qr } from 'src/qr/entities/qr.entity'
import { Transfer } from 'src/transfer/entities/transfer.entity'

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

    @IsNotEmpty()
    @IsString()
    auth0sub: string

    payed: Expense[]

    participatedIn: Participant[]

    transferredTo: Transfer[]

    transferredFrom: Transfer[]

    QR: Qr[]
}
