import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'
import { PrismaService } from 'src/prisma.service'
import { Expense, ExpenseStatus } from '@prisma/client'

@Injectable()
export class ExpenseService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
        /*steps:
        create new expense
        create items
        create participants
        */
        let owes = new Map<string, number>()
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
                const prevAmount = owes.get(part.userId)
                if (prevAmount) {
                    owes.set(part.userId, prevAmount + part.amount)
                } else {
                    owes.set(part.userId, part.amount)
                }
                this.prisma.participant.create({
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
        for (const [userId, amount] of owes) {
            const owe = await this.prisma.owes.findFirst({
                where: {
                    OR: [
                        { user1Id: userId, user2Id: createExpenseDto.payerId },
                        { user1Id: createExpenseDto.payerId, user2Id: userId },
                    ],
                },
            })
            if (owe) {
                if (owe.user1Id === userId) {
                    await this.prisma.owes.update({
                        where: { id: owe.id },
                        data: { amount: owe.amount + amount },
                    })
                } else {
                    await this.prisma.owes.update({
                        where: { id: owe.id },
                        data: { amount: owe.amount - amount },
                    })
                }
            } else {
                await this.prisma.owes.create({
                    data: { amount: amount, user1Id: userId, user2Id: createExpenseDto.payerId },
                })
            }
        }
        return expense
    }

    async findAll(): Promise<Expense[]> {
        return this.prisma.expense.findMany({
            include: { payer: true, items: { include: { participants: true } } },
        })
    }

    async findOne(id: string): Promise<Expense> {
        return this.prisma.expense.findUnique({
            where: { id },
            include: { payer: true, items: { include: { participants: true } } },
        })
    }

    async update(id: string, updateExpenseDto: UpdateExpenseDto) {
        return 'This action adds a new expense'
    }

    async remove(id: string) {
        return 'This action adds a new expense'
    }

    async findAllPayedByUser(id: string): Promise<Expense[]> {
        return this.prisma.expense.findMany({
            where: { payerId: id },
            include: { items: { include: { participants: true } } },
        })
    }
}
