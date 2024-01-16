import { OmitType } from '@nestjs/swagger'
import { Qr } from '../entities/qr.entity'

export class CreateQrDto extends OmitType(Qr, ['id']) {}
