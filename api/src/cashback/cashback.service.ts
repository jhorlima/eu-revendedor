import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  Logger,
  Inject,
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CashbackAccrualDto } from './dto/cashback-accrual.dto';

@Injectable()
export class CashbackService {
  private readonly logger = new Logger(CashbackService.name);

  @Inject()
  private httpService: HttpService;

  async externalCashbackAccrual(nin: string) {
    try {
      this.logger.log(`Obtendo acumulado de cashback. Revendedor: "${nin}".`);

      const {
        data: { statusCode, body },
      } = await firstValueFrom(
        this.httpService.get<CashbackAccrualDto>(process.env.EXTERNAL_API_URL, {
          params: {
            cpf: nin.replace(/[^\d]+/g, ''),
          },
        }),
      );

      if (statusCode !== 200) {
        throw new HttpException(
          body.message || 'Erro desconhecido',
          statusCode,
        );
      }

      return body;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(
        `Ocorreu um erro ao obter acumulado de cashback! Revendedor: "${nin}".`,
        error,
      );
      throw new InternalServerErrorException(error);
    }
  }
}
