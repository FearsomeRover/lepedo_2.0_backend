import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseItemService } from './expense-item.service';
import { CreateExpenseItemDto } from './dto/create-expense-item.dto';
import { UpdateExpenseItemDto } from './dto/update-expense-item.dto';

@Controller('expense-item')
export class ExpenseItemController {
  constructor(private readonly expenseItemService: ExpenseItemService) {}

  @Post()
  create(@Body() createExpenseItemDto: CreateExpenseItemDto) {
    return this.expenseItemService.create(createExpenseItemDto);
  }

  @Get()
  findAll() {
    return this.expenseItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseItemDto: UpdateExpenseItemDto) {
    return this.expenseItemService.update(+id, updateExpenseItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseItemService.remove(+id);
  }
}
