import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator'
import { Expense } from 'src/expense/entities/expense.entity'
import { Participant } from 'src/participant/entities/participant.entity'

export class ExpenseItem {
    /**
     * The id of the expense item
     * @example "11111111-2222-3333-4444-555555555555"
     */
    @IsUUID()
    id: string

    /**
     * The name of the expense item
     * @example "Cheese"
     */
    @IsNotEmpty()
    name: string

    /**
     * The price of the expense item
     * @example 10
     */
    @IsPositive()
    @IsNotEmpty()
    price: number

    /**
     * The participants of the expense item
     */
    @IsNotEmpty()
    participants: Participant[]
}
