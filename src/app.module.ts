import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma.service'
import { TransferModule } from './transfer/transfer.module'
import { ExpenseModule } from './expense/expense.module'
import { ParticipantModule } from './participant/participant.module'
import { QrModule } from './qr/qr.module'

@Module({
    imports: [UserModule, TransferModule, ExpenseModule, ParticipantModule, QrModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
