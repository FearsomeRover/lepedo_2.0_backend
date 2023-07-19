import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma.service';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createExpenseDto: CreateExpenseDto) {
    return await this.prisma.expense.create({
      data: {
        title: createExpenseDto.title,
        amount: createExpenseDto.amount,
        payer: {
          connect: { id: createExpenseDto.payerId },
        },
        received: {
          connect: createExpenseDto.received.map((userId) => ({ id: userId })),
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.expense.findMany({
      include: { received: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.expense.findUnique({
      where: { id },
      include: { received: true },
    });
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const data = {
      title: updateExpenseDto.title,
      amount: updateExpenseDto.amount,
      received: undefined,
      payer: undefined,
    };
    if (updateExpenseDto.received) {
      data.received = {
        connect: updateExpenseDto.received.map((userId) => ({ id: userId })),
      };
    }
    if (updateExpenseDto.payerId) {
      data.payer = {
        connect: {
          id: updateExpenseDto.payerId,
        },
      };
    }
    return await this.prisma.expense.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string) {
    const res = await this.prisma.expense.deleteMany({
      where: { id },
    });
    if (!res.count) {
      throw new NotFoundException('This id does not exist');
    }
  }
}
