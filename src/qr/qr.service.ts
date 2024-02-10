import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateQrDto } from './dto/create-qr.dto'
import { UpdateQrDto } from './dto/update-qr.dto'
import { PrismaService } from 'src/prisma.service'
import { Qr } from './entities/qr.entity'

@Injectable()
export class QrService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createQrDto: CreateQrDto): Promise<string> {
        const res = await this.prisma.qR.create({
            data: {
                title: createQrDto.title,
                amount: createQrDto.amount,
                payTo: {
                    connect: { id: createQrDto.payToId },
                },
            },
        })
        return res.id
    }

    async findAll() {
        const res = await this.prisma.qR.findMany({
            include: {
                payTo: true,
            },
        })
        res.map(qr => delete qr.payTo.auth0sub)
        return res
    }

    async findOne(id: string): Promise<Qr> {
        const res = await this.prisma.qR.findUnique({
            where: {
                id,
            },
            include: {
                payTo: true,
            },
        })
        if (!res) throw new NotFoundException()
        delete res.payTo.auth0sub
        return res
    }

    async update(id: string, updateQrDto: UpdateQrDto): Promise<Qr> {
        try {
            const res = await this.prisma.qR.update({
                where: {
                    id,
                },
                data: {
                    ...updateQrDto,
                },
                include: {
                    payTo: true,
                },
            })
            delete res.payTo.auth0sub
            return res
        } catch (e) {
            if (e.code === 'P2025') {
                throw new NotFoundException()
            }
            throw e
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.prisma.qR.delete({
                where: {
                    id,
                },
            })
        } catch (e) {
            throw new NotFoundException()
        }
    }
}
