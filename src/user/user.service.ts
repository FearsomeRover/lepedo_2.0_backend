import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserModule } from './user.module'
import { Debt } from './entities/debt.entity'
import { User } from './entities/user.entity'
import { BasicUserDto } from './dto/BasicUser.dto'

interface TableUser {
    user: User
    received: number
    payed: number
    transferred: number
    gotTarnsferred: number
    sum: number
}
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createUserDto: CreateUserDto): Promise<BasicUserDto> {
        try {
            return this.prisma.user.create({ data: createUserDto })
        } catch (e) {
            if (e.code === 'P2002') {
                ///failed unique constraint
                throw new ConflictException('Revolut tag already in use')
            } else {
                throw e
            }
        }
    }

    async findOne(id: string) {
        const link = await this.prisma.user.findUnique({
            where: { id },
        })
        if (!link) {
            throw new NotFoundException('This user does not exist')
        }
        return link
    }

    async findAll(): Promise<BasicUserDto[]> {
        return await this.prisma.user.findMany({})
    }

    async delete(id: string): Promise<void> {
        await this.findOne(id)
        await this.prisma.user.delete({ where: { id } })
    }
    async revTagAvailable(revTag: string): Promise<boolean> {
        return (
            (await this.prisma.user.findFirst({
                where: { revTag },
            })) === null
        )
    }
    async update(id: string, updateUserDto: UpdateUserDto): Promise<BasicUserDto> {
        try {
            return await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            })
        } catch (e) {
            if (e.code === 'P2002') {
                throw new ConflictException('Revolut tag already in use')
            } else {
                throw e
            }
        }
    }
    async findOthers(id: string): Promise<Array<Debt>> {
        let map = []
        const positive = await this.prisma.owes.findMany({
            where: { user1Id: id },
        })
        for (const owe of positive) {
            map.push({ id: owe.user2Id, amount: owe.amount })
        }
        const negative = await this.prisma.owes.findMany({
            where: { user2Id: id },
        })
        for (const owe of negative) {
            map.push({ id: owe.user1Id, amount: owe.amount })
        }
        return map
    }

    async thrifty() {
        const expenses = await this.prisma.expense.findMany({})
        console.log(expenses)
    }
}
