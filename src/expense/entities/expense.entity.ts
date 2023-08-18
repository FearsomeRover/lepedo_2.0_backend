import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class Expense {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  amount: number;
  payer: User;

  @IsNotEmpty()
  @IsUUID()
  payerId: string;

  @IsNotEmpty()
  received: string[];

  @IsDateString()
  date: string;
}
