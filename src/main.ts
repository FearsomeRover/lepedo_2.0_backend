import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
        })
    )
    const config = new DocumentBuilder()
        .setTitle('Lepedo')
        .setDescription('Lepedo api description')
        .setVersion('2.0')
        .addBearerAuth()
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
    app.enableCors({
        allowedHeaders: ['Authorization', 'Content-Type'],
    })
    await app.listen(process.env.PORT)
}
bootstrap()
