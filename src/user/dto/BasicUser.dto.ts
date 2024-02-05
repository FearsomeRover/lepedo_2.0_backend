import { User } from '../entities/user.entity'
import { OmitType } from '@nestjs/swagger'

export class BasicUserDto extends OmitType(User, ['QR', 'participatedIn', 'payed', 'transferredFrom', 'transferredTo', 'auth0sub']) {}
