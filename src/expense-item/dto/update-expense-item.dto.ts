import { PartialType } from '@nestjs/swagger';
import { CreateExpenseItemDto } from './create-expense-item.dto';

export class UpdateExpenseItemDto extends PartialType(CreateExpenseItemDto) {}
