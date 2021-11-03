import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';

import { CashbackService } from './cashback.service';
import {
  CashbackAccrualErrorBodyDto,
  CashbackAccrualSuccessBodyDto,
} from './dto/cashback-accrual.dto';

import { User } from '../auth/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cashback')
export class CashbackController {
  @Inject()
  private readonly cashbackService: CashbackService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Acumulado de cashback até o momento',
    type: CashbackAccrualSuccessBodyDto,
  })
  @ApiBadRequestResponse({
    description: 'C.P.F. inválido',
    type: CashbackAccrualErrorBodyDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Sem permissão.',
  })
  externalCashbackAccrual(@User('nin') cpf: string) {
    return this.cashbackService.externalCashbackAccrual(cpf);
  }
}
