import { OmitType } from '@nestjs/swagger';
import { Expense } from '../entities/expense.entity';

export class CreateExpenseDto extends OmitType(Expense, ['id']) {}
