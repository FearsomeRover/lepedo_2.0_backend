import { PartialType } from '@nestjs/swagger'
import { BasicUserDto } from './BasicUser.dto'

export class UpdateUserDto extends PartialType(BasicUserDto) {}
