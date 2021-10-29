import { Ordered } from '../entities/ordered.entity';
import {
  Min,
  IsDate,
  MaxDate,
  IsString,
  IsDecimal,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateOrderedDto
  implements Pick<Ordered, 'code' | 'value' | 'date' | 'usedCashback'>
{
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsDate()
  @MaxDate(new Date())
  date: Date;

  @IsBoolean()
  usedCashback: boolean;

  @IsDecimal()
  @Min(0)
  value: number;
}
