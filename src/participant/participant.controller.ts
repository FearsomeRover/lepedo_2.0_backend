import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ParticipantService } from './participant.service'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { ExpenseStatus, User } from '@prisma/client'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator'

@ApiTags('participant')
@Controller('participant')
export class ParticipantController {
    constructor(private readonly participantService: ParticipantService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.participantService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() status: ExpenseStatus) {
        return this.participantService.update(id, status)
    }

    @Patch(':id/accept')
    accept(@CurrentUser() user: User, @Param('id') id: string) {
        return this.participantService.accept(user, id)
    }
    @Patch(':id/decline')
    decline(@CurrentUser() user: User, @Param('id') id: string) {
        return this.participantService.decline(user, id)
    }
}
