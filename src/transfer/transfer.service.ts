import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransferService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTransferDto: CreateTransferDto) {
    return await this.prisma.transfer.create({
      data: createTransferDto,
    });
  }

  findAll() {
    return `This action returns all transfer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transfer`;
  }

  update(id: number, updateTransferDto: UpdateTransferDto) {
    return `This action updates a #${id} transfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} transfer`;
  }
}
