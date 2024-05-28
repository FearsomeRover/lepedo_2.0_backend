import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common'
import { ExpenseService } from './expense.service'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'
import { Expense, User } from '@prisma/client'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuth } from 'src/auth/decorators/JwtAuth.decorator'
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator'
@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    @Post()
    create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
        return this.expenseService.create(createExpenseDto)
    }

    @JwtAuth()
    @Get()
    findAllByUser(@CurrentUser() user: User) {
        return this.expenseService.findAllByUser(user.id)
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.expenseService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
        return this.expenseService.update(id, updateExpenseDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.expenseService.remove(id)
    }
}
