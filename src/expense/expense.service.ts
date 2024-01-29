import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'
import { PrismaService } from 'src/prisma.service'
import { Expense, ExpenseStatus } from '@prisma/client'

@Injectable()
export class ExpenseService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createExpenseDto: CreateExpenseDto) {
        /*steps:
        create new expense
        create items
        create participants
        */
        const expense = await this.prisma.expense.create({
            data: {
                title: createExpenseDto.title,
                payer: {
                    connect: { id: createExpenseDto.payerId },
                },
                date: createExpenseDto.date,
                amount: createExpenseDto.amount,
            },
        })
        for (const item of createExpenseDto.items) {
            const dbItem = await this.prisma.expenseItem.create({
                data: {
                    expense: {
                        connect: { id: expense.id },
                    },
                    name: item.name,
                    price: item.price,
                },
            })
            for (const part of item.participants) {
                await this.prisma.participant.create({
                    data: {
                        item: {
                            connect: { id: dbItem.id },
                        },
                        user: {
                            connect: { id: part.userId },
                        },
                        amount: part.amount,
                        isAccepted: ExpenseStatus.NONE,
                    },
                })
            }
        }
    }

    async findAll() {
        return await this.prisma.expense.findMany({
            include: { payer: true },
        })
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
