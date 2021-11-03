import { ApiProperty } from '@nestjs/swagger';

export class ListOrderDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  value: number;

  @ApiProperty({
    minimum: 0,
    maximum: 1,
  })
  cashbackPercentage: number;

  @ApiProperty()
  cashbackAmount: number;
}
