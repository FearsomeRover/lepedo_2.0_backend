import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator'
import { User } from 'src/user/entities/user.entity'
import { ExpenseItem } from './expense-item.entity'

export class Expense {
    @IsUUID()
    id: string

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    @IsPositive()
    amount: number

    @IsNotEmpty()
    @IsUUID()
    payerId: string

    @IsNotEmpty()
    items: ExpenseItem[]

    @IsDateString()
    @IsOptional()
    date: string
}
