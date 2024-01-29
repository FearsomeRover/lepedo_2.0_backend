import { Module } from '@nestjs/common'
import { QrService } from './qr.service'
import { QrController } from './qr.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
    controllers: [QrController],
    providers: [QrService, PrismaService],
})
export class QrModule {}
