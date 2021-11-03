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
  @ApiProperty({ example: 'SKU12345678' })
  code: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: new Date() })
  date: Date;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 345.67 })
  value: number;

  @IsString()
  @Matches(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/)
  @Validate(CpfValidator)
  @ApiProperty({
    pattern: '^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$',
    example: '153.509.460-56',
  })
  resellerNin: string;
}
