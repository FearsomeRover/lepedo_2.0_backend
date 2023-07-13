import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './util/environment';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  const prismaService: PrismaService = app.get(PrismaService);
  await app.listen(PORT);
}
bootstrap();
