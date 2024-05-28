import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UpdateUserDto } from './dto/updateUser.dto'
import { User } from './entities/user.entity'
import { BasicUserDto } from './dto/BasicUser.dto'
import { TableRow } from './dto/TableRow.dto'
import { Auth0Profile } from 'src/types/auth.types'
const colors = ['#D9515E', '#51BB88', '#F86E0B', '#0F8A8E', '#FFB100', '#9370DB', '#52BBE8']

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async createUserForAuth0User(auth0Profile: Auth0Profile): Promise<User> {
        return this.prisma.user.create({
            data: {
                id: auth0Profile.sub,
                name: auth0Profile.name,
                revTag: '',
                color: colors[(auth0Profile.name.charCodeAt(0) + auth0Profile.name.charCodeAt(2)) % colors.length],
            },
        })
    }
    async getUserByAuthId(authId: string): Promise<User | undefined> {
        return this.prisma.user.findFirst({ where: { id: authId } })
    }
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
        return this.prisma.user.findUnique({ where: { id } })
    }

    async findOne(id: string) {
        const res = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                revTag: true,
                color: true,
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
