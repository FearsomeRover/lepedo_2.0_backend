import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { PrismaService } from 'src/prisma.service';
import { connect } from 'http2';

@Injectable()
export class TransferService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTransferDto: CreateTransferDto) {
    const data = {
      date: createTransferDto.date,
      amount: createTransferDto.amount,
      userFrom: {
        connect: { id: createTransferDto.userFromId },
      },
      userTo: {
        connect: { id: createTransferDto.userToId },
      },
    };
    return await this.prisma.transfer.create({
      data: data,
    });
  }

  async findAll() {
    return await this.prisma.transfer.findMany({
      include: { userFrom: true, userTo: true },
    });
  }

  async findOne(id: string) {
    const res = await this.prisma.transfer.findUnique({
      where: { id },
      include: { userFrom: true, userTo: true },
    });
    if (!res) {
      throw new NotFoundException('This id does not exist');
    }
    return res;
  }

  async update(id: string, updateTransferDto: UpdateTransferDto) {
    const data = {
      date: updateTransferDto.date,
      amount: updateTransferDto.amount,
      userFrom: undefined,
      userTo: undefined,
    };
    if (updateTransferDto.userFromId) {
      data.userFrom = {
        connect: { id: updateTransferDto.userFromId },
      };
    }
    if (updateTransferDto.userToId) {
      data.userTo = {
        connect: { id: updateTransferDto.userToId },
      };
    }
    return await this.prisma.transfer.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string) {
    const res = await this.prisma.transfer.deleteMany({
      where: { id },
    });
    if (!res.count) {
      throw new NotFoundException('This id does not exist');
    }
  }
}
