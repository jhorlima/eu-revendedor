import { Ordered } from '../entities/ordered.entity';

export class CreateOrderedDto
  implements Pick<Ordered, 'code' | 'value' | 'date' | 'usedCashback'>
{
  code: string;
  date: Date;
  usedCashback: boolean;
  value: number;
}
