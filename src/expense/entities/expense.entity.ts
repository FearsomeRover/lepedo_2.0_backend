import { IsNotEmpty, IsUUID } from 'class-validator';

export class Expense {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  amount: number;
  //date: string;
  //payer: User;

  @IsNotEmpty()
  @IsUUID()
  payerId: string;

  @IsNotEmpty()
  received: string[];
}
