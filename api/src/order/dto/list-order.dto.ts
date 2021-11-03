import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';

export class ListOrderDto {
  @ApiProperty({ example: 'SKU12345678' })
  code: string;

  @ApiProperty({ example: new Date() })
  date: Date;

  @ApiProperty({ example: 345.67 })
  value: number;

  @ApiProperty({
    minimum: 0,
    maximum: 1,
    example: 0.1,
  })
  cashbackPercentage: number;

  @ApiProperty({ example: 34.5 })
  cashbackAmount: number;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.in_validation })
  status: OrderStatus;
}
