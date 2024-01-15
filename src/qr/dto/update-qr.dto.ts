import { PartialType } from '@nestjs/swagger';
import { CreateQrDto } from './create-qr.dto';

export class UpdateQrDto extends PartialType(CreateQrDto) {}
