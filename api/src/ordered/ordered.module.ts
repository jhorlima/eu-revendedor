import { Module } from '@nestjs/common';
import { OrderedService } from './ordered.service';
import { OrderedController } from './ordered.controller';

@Module({
  controllers: [OrderedController],
  providers: [OrderedService],
})
export class OrderedModule {}
