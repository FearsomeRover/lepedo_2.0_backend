import { OmitType } from '@nestjs/mapped-types';
import { Expense } from '../entities/expense.entity';

export class CreateExpenseDto extends OmitType(Expense, ['id']) {}
