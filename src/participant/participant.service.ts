import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { PrismaService } from 'src/prisma.service'
import { ExpenseStatus, User } from '@prisma/client'

@Injectable()
export class ParticipantService {
    decline(user: User, id: string) {
        try {
            this.prisma.participant.update({
                where: { id, userId: user.id },
                data: { isAccepted: ExpenseStatus.DECLINED },
            })
        } catch (e) {
            throw new ForbiddenException("You don't have permission to edit this resource")
        }
    }
    constructor(private readonly prisma: PrismaService) {}
    accept(user: User, id: string) {
        try {
            this.prisma.participant.update({
                where: { id, userId: user.id },
                data: { isAccepted: ExpenseStatus.ACCEPTED },
            })
        } catch (e) {
            throw new ForbiddenException("You don't have permission to edit this resource")
        }
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

    remove(id: string) {
        return `This action removes a #${id} participant`
    }
}
