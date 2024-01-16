import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'
import { PrismaService } from 'src/prisma.service'
import { Expense } from '@prisma/client'

@Injectable()
export class ExpenseService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createExpenseDto: CreateExpenseDto) {
        return await this.prisma.expense.create({
            data: createExpenseDto,
        })
    }

    async findAll() {
        return await this.prisma.expense.findMany()
    }

    async findOne(id: string) {
        return 'This action adds a new expense'
    }

    async update(id: string, updateExpenseDto: UpdateExpenseDto) {
        return 'This action adds a new expense'
    }

    async remove(id: string) {
        return 'This action adds a new expense'
    }
}
