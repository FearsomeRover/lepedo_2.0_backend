import { BasicUserDto } from 'src/user/dto/BasicUser.dto'

export class SimpleExpenseItemDto {
    name: string
    price: number
    participants: BasicUserDto[]
}
