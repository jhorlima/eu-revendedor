import {
  ApiTags,
  ApiOperation,
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

@ApiTags('cashback')
@Controller('cashback')
export class CashbackController {
  @Inject()
  private readonly cashbackService: CashbackService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Rota para exibir o acumulado de cashback até o momento, essa rota ' +
      'irá consumir essa informação de uma API externa disponibilizada ' +
      'pelo Boticário.',
  })
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
