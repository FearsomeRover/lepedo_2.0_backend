import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QrService } from './qr.service';
import { CreateQrDto } from './dto/create-qr.dto';
import { UpdateQrDto } from './dto/update-qr.dto';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Post()
  create(@Body() createQrDto: CreateQrDto) {
    return this.qrService.create(createQrDto);
  }

  @Get()
  findAll() {
    return this.qrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qrService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQrDto: UpdateQrDto) {
    return this.qrService.update(+id, updateQrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qrService.remove(+id);
  }
}
