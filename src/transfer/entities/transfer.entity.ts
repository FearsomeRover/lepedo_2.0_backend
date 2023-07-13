import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class Transfer {
  @IsUUID()
  id: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsUUID()
  @IsNotEmpty()
  userFromId: string;

  @IsUUID()
  @IsNotEmpty()
  userToId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
// export class Transfer {
//   id: string;
//   date: string;
//   userFromId: string;
//   userToId: string;
//   amount: number;
// }
