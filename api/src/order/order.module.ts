import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderModel } from './entities/order.entity';

import { ResellerModule } from '../reseller/reseller.module';

@Module({
  imports: [ResellerModule, MongooseModule.forFeature([OrderModel])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
