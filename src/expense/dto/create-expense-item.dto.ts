import { OmitType } from '@nestjs/swagger'
import { Expense } from '../entities/expense.entity'
import { ExpenseItem } from '../entities/expense-item.entity'
import { CreateParticipantDto } from 'src/participant/dto/create-participant.dto'
import { IsUUID } from 'class-validator'

export class CreateExpenseItemDto extends OmitType(ExpenseItem, ['id', 'participants']) {
    price: number
    name: string

    participants: CreateParticipantDto[]
}
