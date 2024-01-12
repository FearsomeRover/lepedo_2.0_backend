import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaModule } from 'nestjs-prisma'
import { PrismaService } from 'src/prisma.service'

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UserModule {}
