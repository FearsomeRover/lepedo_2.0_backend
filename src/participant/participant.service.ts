import { Injectable } from '@nestjs/common'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { PrismaService } from 'src/prisma.service'
import { ExpenseStatus } from '@prisma/client'

@Injectable()
export class ParticipantService {
    constructor(private readonly prisma: PrismaService) {}
    create(createParticipantDto: CreateParticipantDto) {
        // return this.prisma.participant.create({
        //     data: {
        //         item: {
        //             connect: { id: createParticipantDto.itemId },
        //         },
        //         user: {
        //             connect: { id: createParticipantDto.userId },
        //         },
        //         shares: createParticipantDto.shares,
        //         isAccepted: ExpenseStatus.NONE,
        //     },
        // })
    }

    findAll() {
        return `This action returns all participant`
    }

    findOne(id: number) {
        return `This action returns a #${id} participant`
    }

    update(id: string, status: ExpenseStatus) {
        return this.prisma.participant.update({
            where: { id },
            data: { isAccepted: status },
        })
    }

    remove(id: number) {
        return `This action removes a #${id} participant`
    }
}
