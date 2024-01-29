import { OmitType } from '@nestjs/swagger'
import { Expense } from '../entities/expense.entity'
import { CreateExpenseItemDto } from './create-expense-item.dto'

export class CreateExpenseDto extends OmitType(Expense, ['id', 'items']) {
    items: CreateExpenseItemDto[]
}
