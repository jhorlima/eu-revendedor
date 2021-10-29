import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RetailerService } from './retailer.service';
import { RetailerController } from './retailer.controller';
import { RetailerModel } from './entities/retailer.entity';

import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule, MongooseModule.forFeature([RetailerModel])],
  providers: [RetailerService],
  controllers: [RetailerController],
  exports: [RetailerService],
})
export class RetailerModule {}
