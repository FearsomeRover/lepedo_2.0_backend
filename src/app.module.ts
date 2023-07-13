import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
