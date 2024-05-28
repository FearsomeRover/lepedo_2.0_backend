import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { QrService } from './qr.service'
import { CreateQrDto } from './dto/create-qr.dto'
import { UpdateQrDto } from './dto/update-qr.dto'
import { ApiTags } from '@nestjs/swagger'
import { Qr } from './entities/qr.entity'
import { JwtAuth } from 'src/auth/decorators/JwtAuth.decorator'
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator'
import { User } from 'src/user/entities/user.entity'

@ApiTags('qr')
@Controller('qr')
export class QrController {
    constructor(private readonly qrService: QrService) {}

    @JwtAuth()
    @Post()
    create(@Body() createQrDto: CreateQrDto, @CurrentUser() user: User) {
        return this.qrService.create(user, createQrDto)
    }

    @Get()
    findAll(): Promise<Qr[]> {
        return this.qrService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Qr> {
        return this.qrService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateQrDto: UpdateQrDto): Promise<Qr> {
        return this.qrService.update(id, updateQrDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.qrService.remove(id)
    }
}
