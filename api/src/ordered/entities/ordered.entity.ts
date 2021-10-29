import { Retailer } from '../../retailer/entities/retailer.entity';

export enum OrderedStatus {
  approved = 'Aprovado',
  in_validation = 'Em validação',
}

export class Ordered {
  code: string;
  value: number;
  date: Date;
  cashback: number;
  usedCashback: boolean;
  status: OrderedStatus;
  retailer: Retailer;
}
