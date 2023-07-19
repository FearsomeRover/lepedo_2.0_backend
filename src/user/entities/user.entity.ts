import { IsNotEmpty, IsString, IsUUID, isUUID } from 'class-validator';

export class User {
  /**
   * The unique identifier of the link
   * @example 'aaaaaaaa-bbbb-cccc-dddd-0123456789ab'
   */
  @IsUUID()
  id: string;
  /**
   * The name of the user
   * @example 'NAME'
   */
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
