import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma.service';
import { Expense } from '@prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createExpenseDto: CreateExpenseDto) {
    return await this.prisma.expense.create({
      data: {
        title: createExpenseDto.title,
        amount: createExpenseDto.amount,
        date: createExpenseDto.date,
        payer: {
          connect: { id: createExpenseDto.payerId },
        },
        received: {
          connect: createExpenseDto.received.map((userId) => ({ id: userId })),
        },
      },
    });
  }

  async findAll(): Promise<Expense[]> {
    return await this.prisma.expense.findMany({
      include: { received: true, payer: true },
    });
  }

  async findOne(id: string): Promise<Expense> {
    const res = await this.prisma.expense.findUnique({
      where: { id },
      include: { received: true, payer: true },
    });
    if (!res) {
      throw new NotFoundException('This id does not exist');
    }
    return res;
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const data = {
      title: updateExpenseDto.title,
      amount: updateExpenseDto.amount,
      received: undefined,
      payer: undefined,
    };
    if (updateExpenseDto.received) {
      data.received = {
        set: updateExpenseDto.received.map((userId) => ({ id: userId })),
      };
    }
    if (updateExpenseDto.payerId) {
      data.payer = {
        set: {
          id: updateExpenseDto.payerId,
        },
      };
    }
    return await this.prisma.expense.update({
      where: { id },
      data: data,
      include: { received: true },
    });
  }

  async remove(id: string): Promise<void> {
    const res = await this.prisma.expense.deleteMany({
      where: { id },
    });
    if (!res.count) {
      throw new NotFoundException('This id does not exist');
    }
  }
}
