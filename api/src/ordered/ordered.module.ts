import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderedService } from './ordered.service';
import { OrderedController } from './ordered.controller';
import { OrderedModel } from './entities/ordered.entity';

import { ResellerModule } from '../reseller/reseller.module';

@Module({
  imports: [ResellerModule, MongooseModule.forFeature([OrderedModel])],
  controllers: [OrderedController],
  providers: [OrderedService],
})
export class OrderedModule {}
