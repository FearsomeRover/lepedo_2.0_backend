import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { Expense } from 'src/expense/entities/expense.entity'
import { Participant } from 'src/participant/entities/participant.entity'
import { Qr } from 'src/qr/entities/qr.entity'
import { Transfer } from 'src/transfer/entities/transfer.entity'

export class User {
    /**
     * The id of the user
     * @example "11111111-2222-3333-4444-555555555555"
     */
    @IsUUID()
    id: string

    /**
     * The name of the user
     * @example "John Doe"
     */
    @IsString()
    @IsNotEmpty()
    name: string

    /**
     * The revTag of the user
     * @example "johndoe"
     */
    @IsString()
    @IsNotEmpty()
    revTag: string //store it without the @ sign pls

    /**
     * The color of the user
     * @example "#ff0000"
     */
    @IsString()
    @IsNotEmpty()
    color: string

    @IsOptional()
    payed?: Expense[]

    @IsOptional()
    participatedIn?: Participant[]

    @IsOptional()
    transferredTo?: Transfer[]

    @IsOptional()
    transferredFrom?: Transfer[]

    @IsOptional()
    QR?: Qr[]
}
