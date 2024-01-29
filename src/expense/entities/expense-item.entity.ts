import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator'
import { Expense } from 'src/expense/entities/expense.entity'
import { Participant } from 'src/participant/entities/participant.entity'

export class ExpenseItem {
    @IsUUID()
    id: string

    @IsNotEmpty()
    name: string

    @IsPositive()
    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    participants: Participant[]

    @IsNotEmpty()
    expense: Expense
}
