import { ExpenseStatus } from '@prisma/client'
import { IsUUID } from 'class-validator'

export class UpdateItemDto {
    @IsUUID()
    userId: string

    status: ExpenseStatus
}
