import { OmitType } from '@nestjs/swagger'
import { Expense } from '../entities/expense.entity'
import { CreateExpenseItemDto } from './create-expense-item.dto'
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator'

export class CreateExpenseDto extends OmitType(Expense, ['id', 'items']) {
    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1)
    items: CreateExpenseItemDto[]
}
