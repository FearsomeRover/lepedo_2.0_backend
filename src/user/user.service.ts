import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserModule } from './user.module'
import { Debt } from './entities/debt.entity'
import { User } from './entities/user.entity'
import { BasicUserDto } from './dto/BasicUser.dto'
import { TableRow } from './dto/TableRow.dto'

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
    async getUserTable(id: string): Promise<TableRow[]> {
        const data = await this.prisma.userRelation.findMany({
            where: { OR: [{ user1Id: id }, { user2Id: id }] },
            select: {
                userFrom: {
                    select: {
                        id: true,
                        name: true,
                        revTag: true,
                        color: true,
                    },
                },
                userTo: {
                    select: {
                        id: true,
                        name: true,
                        revTag: true,
                        color: true,
                    },
                },
                owesFrom: true,
                owesTo: true,
                transferredFrom: true,
                transferredTo: true,
            },
        })
        return data.map(x => {
            if (x.userFrom.id === id) {
                //id is on the userFrom side
                const row = {
                    user: x.userTo,
                    owesYou: x.owesTo,
                    youOwe: x.owesFrom,
                    transferredTo: x.transferredFrom,
                    transferredFrom: x.transferredTo,
                    total: 0,
                }
                row.total = row.owesYou - row.youOwe + row.transferredTo - row.transferredFrom
                return row
            }
            const row = {
                user: x.userFrom,
                owesYou: x.owesFrom,
                youOwe: x.owesTo,
                transferredTo: x.transferredTo,
                transferredFrom: x.transferredFrom,
                total: 0,
            }
            row.total = row.owesYou - row.youOwe + row.transferredTo - row.transferredFrom
            return row
        })
    }
    findAuth0(id: string): Promise<BasicUserDto> {
        return this.prisma.user.findUnique({ where: { auth0sub: id } })
    }
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
        const res = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                revTag: true,
                color: true,
                auth0sub: false,
            },
        })
        if (!res) {
            throw new NotFoundException('This user does not exist')
        }
        return res
    }
    async findFriends(id: string): Promise<BasicUserDto[]> {
        const res = await this.prisma.userRelation.findMany({
            where: { OR: [{ user1Id: id }, { user2Id: id }] },
            select: {
                userFrom: {
                    select: {
                        id: true,
                        name: true,
                        revTag: true,
                        color: true,
                    },
                },
                userTo: {
                    select: {
                        id: true,
                        name: true,
                        revTag: true,
                        color: true,
                    },
                },
            },
        })
        return res.map(x => {
            if (x.userFrom.id === id) {
                return {
                    id: x.userTo.id,
                    name: x.userTo.name,
                    revTag: x.userTo.revTag,
                    color: x.userTo.color,
                }
            }
            return {
                id: x.userFrom.id,
                name: x.userFrom.name,
                revTag: x.userFrom.revTag,
                color: x.userFrom.color,
            }
        })
    }

    async findAll(): Promise<BasicUserDto[]> {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                revTag: true,
                color: true,
                auth0sub: false,
            },
        })
    }

    async delete(id: string): Promise<void> {
        await this.findOne(id)
        await this.prisma.userRelation.deleteMany({ where: { OR: [{ user1Id: id }, { user2Id: id }] } })
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

    async thrifty() {
        const expenses = await this.prisma.expense.findMany({})
        console.log(expenses)
    }
}
