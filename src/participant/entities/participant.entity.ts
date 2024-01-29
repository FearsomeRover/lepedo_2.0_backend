import { User } from '@prisma/client'
import { IsUUID, Max, Min } from 'class-validator'
import { ExpenseItem } from 'src/expense/entities/expense-item.entity'

export class Participant {
    @IsUUID()
    id: string

    item: ExpenseItem

    user: User

    amount: number

    isAccepted: boolean
}
