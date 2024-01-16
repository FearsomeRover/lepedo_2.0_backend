import { Module } from '@nestjs/common'
import { TransferService } from './transfer.service'
import { TransferController } from './transfer.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
    controllers: [TransferController],
    providers: [TransferService, PrismaService],
})
export class TransferModule {}
