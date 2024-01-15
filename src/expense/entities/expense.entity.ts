import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator'
import { ExpenseItem } from 'src/expense-item/entities/expense-item.entity'
import { User } from 'src/user/entities/user.entity'

export class Expense {
    @IsUUID()
    id: string

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    @IsPositive()
    amount: number

    @IsNotEmpty()
    payer: User

    @IsNotEmpty()
    items: ExpenseItem[]

    @IsDateString()
    @IsOptional()
    date: string
}
