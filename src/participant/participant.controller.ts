import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ParticipantService } from './participant.service'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { ExpenseStatus } from '@prisma/client'

@Controller('participant')
export class ParticipantController {
    constructor(private readonly participantService: ParticipantService) {}

    @Post()
    create(@Body() createParticipantDto: CreateParticipantDto) {
        return this.participantService.create(createParticipantDto)
    }

    @Get()
    findAll() {
        return this.participantService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.participantService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() status: ExpenseStatus) {
        return this.participantService.update(id, status)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.participantService.remove(+id)
    }
}
