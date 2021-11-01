import {
  Min,
  IsDate,
  Matches,
  IsString,
  Validate,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CpfValidator } from '../../shared/cpf.validator';

export class CreateOrderedDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsBoolean()
  usedCashback: boolean;

  @IsNumber()
  @Min(0)
  value: number;

  @IsString()
  @Matches(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/)
  @Validate(CpfValidator)
  resellerNin: string;
}
