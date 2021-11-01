import {
  Length,
  Matches,
  IsEmail,
  IsString,
  Validate,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

import { CpfValidator } from '../../shared/cpf.validator';

export class CreateResellerDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fullName: string;

  @IsString()
  @Matches(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/)
  @Validate(CpfValidator)
  nin: string;

  @IsString()
  @Length(6, 14)
  password: string;
}
