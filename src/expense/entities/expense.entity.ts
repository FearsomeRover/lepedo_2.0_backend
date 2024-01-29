import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator'
import { User } from 'src/user/entities/user.entity'
import { ExpenseItem } from './expense-item.entity'

export class Expense {
    /**
     * The id of the expense
     * @example "11111111-2222-3333-4444-555555555555"
     */
    @IsUUID()
    id: string

    /**
     * The title of the expense
     * @example "Pizza"
     */
    @IsNotEmpty()
    title: string

    /**
     * The summarized amount of the expense
     * @example 200
     */
    @IsNotEmpty()
    @IsPositive()
    amount: number

    /**
     * The payer of the expense
     * @example "11111111-2222-3333-4444-555555555555"
     */
    @IsNotEmpty()
    @IsUUID()
    payerId: string

    @IsNotEmpty()
    items: ExpenseItem[]

    /**
     * The date of the expense
     * @example "2020-11-01"
     */
    @IsDateString()
    @IsOptional()
    date: string
}
