import { OmitType } from '@nestjs/mapped-types';
import { Transfer } from '../entities/transfer.entity';

export class CreateTransferDto extends OmitType(Transfer, ['id']) {}
