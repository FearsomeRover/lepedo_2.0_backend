import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all expense`;
  }

  async findOne(id: string) {
    const result = await this.prisma.expense.findUnique({
      where: { id },
      include: { received: true },
    });
    console.log(result);
    return result;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
