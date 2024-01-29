import { OmitType } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { Participant } from '../entities/participant.entity'

export class CreateParticipantDto extends OmitType(Participant, ['id', 'item', 'user', 'isAccepted']) {
    @IsUUID()
    userId: string
}
