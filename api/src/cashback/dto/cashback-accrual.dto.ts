import { ApiProperty } from '@nestjs/swagger';

export class CashbackAccrualSuccessBodyDto {
  @ApiProperty({ example: 4507 })
  credit?: number;
}

export class CashbackAccrualErrorBodyDto {
  @ApiProperty({
    example: 'CPF do revendedor(a) está incorreto, utilize apenas números!',
  })
  message?: string;
}

export class CashbackAccrualDto {
  statusCode: number;
  body: CashbackAccrualSuccessBodyDto & CashbackAccrualErrorBodyDto;
}
