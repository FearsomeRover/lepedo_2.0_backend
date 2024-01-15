import { Module } from '@nestjs/common';
import { ExpenseItemService } from './expense-item.service';
import { ExpenseItemController } from './expense-item.controller';

@Module({
  controllers: [ExpenseItemController],
  providers: [ExpenseItemService]
})
export class ExpenseItemModule {}
