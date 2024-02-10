import { BasicUserDto } from './BasicUser.dto'

export class TableRow {
    user: BasicUserDto
    owesYou: number
    youOwe: number
    transferredTo: number
    transferredFrom: number
    total: number
}
