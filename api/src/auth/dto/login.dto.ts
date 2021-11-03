import { IsString, Length, Matches, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CpfValidator } from '../../shared/cpf.validator';

export class LoginDto {
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
