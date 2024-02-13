import { Injectable, MethodNotAllowedException } from '@nestjs/common'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'
import { PrismaService } from 'src/prisma.service'
import { Expense, ExpenseStatus } from '@prisma/client'
import { SimpleExpenseDto } from './dto/simple-expense.dto'

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
        const acceptance = await this.prisma.expense.findUnique({ where: { id }, include: { items: { include: { participants: true } } } })
        let accepted = false
        for (const item of acceptance.items) {
            for (const participant of item.participants) {
                if (participant.isAccepted === ExpenseStatus.NONE) {
                    accepted = false
                    break
                }
                accepted = true
            }
        }
        if (accepted) {
            throw new MethodNotAllowedException('You cannot update an expense that has been accepted by all participants')
        }
        return 'This action adds a new expense'
    }

    async remove(id: string) {
        const expense = await this.prisma.expense.findUnique({ where: { id } })
        if (!expense) {
            return 'This expense does not exist'
        }
        const items = await this.prisma.expenseItem.findMany({ where: { expenseId: id } })
        for (const item of items) {
            const participants = await this.prisma.participant.findMany({ where: { expenseItemId: item.id } })
            for (const participant of participants) {
                await this.prisma.participant.delete({ where: { id: participant.id } })
            }
            await this.prisma.expenseItem.delete({ where: { id: item.id } })
        }
        await this.prisma.expense.delete({ where: { id } })
        return 'Expense deleted'
        //todo update owes !!!!!
    }

    async findAllByUser(id: string): Promise<SimpleExpenseDto[]> {
        const expenses = await this.getExpensesByUser(id)
        return expenses.map(expense => {
            return {
                title: expense.title,
                date: expense.date,
                payer: expense.payer,
                sum: expense.amount,
                yourShare: expense.items
                    .map(item => item.participants.find(participant => participant.user.id === id).amount)
                    .reduce((acc, curr) => acc + curr, 0),
                items: expense.items.map(item => {
                    return {
                        name: item.name,
                        price: item.price,
                        participants: item.participants.map(participant => {
                            return {
                                name: participant.user.name,
                                id: participant.user.id,
                                color: participant.user.color,
                                revTag: participant.user.revTag,
                            }
                        }),
                    }
                }),
            }
        })
    }
    async getExpensesByUser(id: string) {
        return await this.prisma.expense.findMany({
            where: {
                OR: [
                    {
                        payerId: id, // Expenses where the user is the payer
                    },
                    {
                        items: {
                            some: {
                                participants: {
                                    some: {
                                        userId: id, // Expense items where the user is a participant
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                title: true,
                date: true,
                amount: true,
                payer: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                        revTag: true,
                    },
                },
                items: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        participants: {
                            select: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        color: true,
                                        revTag: true,
                                    },
                                },
                                amount: true,
                            },
                        },
                    },
                },
            },
        })
    }
}
