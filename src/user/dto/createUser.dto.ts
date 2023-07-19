import { User } from '../entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDto extends OmitType(User, ['id']) {}
