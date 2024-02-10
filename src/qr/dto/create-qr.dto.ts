import { OmitType } from '@nestjs/swagger'
import { Qr } from '../entities/qr.entity'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateQrDto extends OmitType(Qr, ['id', 'payTo']) {
    @IsUUID()
    @IsNotEmpty()
    payToId: string
}
