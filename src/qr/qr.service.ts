import { Injectable } from '@nestjs/common'
import { CreateQrDto } from './dto/create-qr.dto'
import { UpdateQrDto } from './dto/update-qr.dto'
import { PrismaService } from 'src/prisma.service'
import { Qr } from './entities/qr.entity'

@Injectable()
export class QrService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createQrDto: CreateQrDto): Promise<Qr> {
        return await this.prisma.qR.create({
            data: {
                amount: createQrDto.amount,
                payTo: {
                    connect: { id: createQrDto.payToId },
                },
            },
        })
    }

    findAll() {
        return `This action returns all qr`
    }

    findOne(id: number) {
        return `This action returns a #${id} qr`
    }

    update(id: number, updateQrDto: UpdateQrDto) {
        return `This action updates a #${id} qr`
    }

    remove(id: number) {
        return `This action removes a #${id} qr`
    }
}
