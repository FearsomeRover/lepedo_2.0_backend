import { User } from '@prisma/client'
import { IsUUID, Max, Min } from 'class-validator'
import { ExpenseItem } from 'src/expense-item/entities/expense-item.entity'

export class Participant {
    @IsUUID()
    id: string

    date: string

    item: ExpenseItem

    user: User

    @Max(1)
    @Min(0)
    shares: number

    isAccepted: boolean
}
