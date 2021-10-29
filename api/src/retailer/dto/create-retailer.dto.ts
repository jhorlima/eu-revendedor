import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  Validate,
} from 'class-validator';

import { Retailer } from '../entities/retailer.entity';
import { CpfValidator } from '../../shared/cpf.validator';

export class CreateRetailerDto implements Retailer {
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
