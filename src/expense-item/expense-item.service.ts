import { Injectable } from '@nestjs/common';
import { CreateExpenseItemDto } from './dto/create-expense-item.dto';
import { UpdateExpenseItemDto } from './dto/update-expense-item.dto';

@Injectable()
export class ExpenseItemService {
  create(createExpenseItemDto: CreateExpenseItemDto) {
    return 'This action adds a new expenseItem';
  }

  findAll() {
    return `This action returns all expenseItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseItem`;
  }

  update(id: number, updateExpenseItemDto: UpdateExpenseItemDto) {
    return `This action updates a #${id} expenseItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseItem`;
  }
}
