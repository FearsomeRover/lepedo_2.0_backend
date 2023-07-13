import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  revTag: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
