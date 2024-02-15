import { BasicUserDto } from 'src/user/dto/BasicUser.dto'
import { SimpleExpenseItemDto } from './simple-item-expense.dto'

export class SimpleExpenseDto {
    payer: BasicUserDto
    title: string
    date: string
    items: SimpleExpenseItemDto[]
    yourShare: number
    sum: number
}
