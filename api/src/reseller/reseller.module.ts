import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ResellerService } from './reseller.service';
import { ResellerController } from './reseller.controller';
import { ResellerModel } from './entities/reseller.entity';

import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule, MongooseModule.forFeature([ResellerModel])],
  providers: [ResellerService],
  controllers: [ResellerController],
  exports: [ResellerService],
})
export class ResellerModule {}
