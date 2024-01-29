import { IsUUID } from 'class-validator'

export class Debt {
    /**
     * The amount of the debt If its positive, the user is owed money from the other user, if its negative, the user owes money to the other user
     * @example 100
     */
    amount: number

    /**
     * The id of the user who owes the debt
     * @example "11111111-2222-3333-4444-555555555555"
     */
    @IsUUID()
    to: string
}
