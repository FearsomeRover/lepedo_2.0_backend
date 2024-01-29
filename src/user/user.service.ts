import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from '@prisma/client'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserModule } from './user.module'

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
    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.prisma.user.create({ data: createUserDto })
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

    async findAll() {
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
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
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
    async thrifty() {
        const expenses = await this.prisma.expense.findMany({})
        console.log(expenses)
    }
}
