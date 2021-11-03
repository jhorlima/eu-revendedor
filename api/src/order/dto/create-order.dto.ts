import {
  Min,
  IsDate,
  Matches,
  IsString,
  Validate,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CpfValidator } from '../../shared/cpf.validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  date: Date;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  value: number;

  @IsString()
  @Matches(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/)
  @Validate(CpfValidator)
  @ApiProperty({
    pattern: '^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$',
  })
  resellerNin: string;
}
