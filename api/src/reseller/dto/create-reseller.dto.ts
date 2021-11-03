import {
  Length,
  Matches,
  IsEmail,
  IsString,
  Validate,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CpfValidator } from '../../shared/cpf.validator';

export class CreateResellerDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    minLength: 1,
    maxLength: 255,
  })
  fullName: string;

  @IsString()
  @Matches(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/)
  @Validate(CpfValidator)
  @ApiProperty({
    pattern: '^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$',
  })
  nin: string;

  @IsString()
  @Length(6, 14)
  @ApiProperty({
    minLength: 6,
    maxLength: 14,
  })
  password: string;
}
