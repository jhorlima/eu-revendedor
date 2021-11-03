import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CashbackService } from './cashback.service';
import { CashbackController } from './cashback.controller';

@Module({
  imports: [HttpModule],
  controllers: [CashbackController],
  providers: [CashbackService],
})
export class CashbackModule {}
