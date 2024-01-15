import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, IsUUID, Max, Min, isPositive } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class Transfer {
    @IsUUID()
    id: string

    @IsDateString()
    @IsNotEmpty()
    date: string

    @IsNotEmpty()
    userFrom: User

    @IsNotEmpty()
    userTo: User

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    amount: number
}
// export class Transfer {
//   id: string;
//   date: string;
//   userFromId: string;
//   userToId: string;
//   amount: number;
// }
