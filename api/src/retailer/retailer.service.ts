import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { RetailerDocument } from './entities/retailer.entity';
import { CreateRetailerDto } from './dto/create-retailer.dto';

import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class RetailerService {
  @Inject()
  readonly bcryptService: BcryptService;

  @InjectModel(RetailerDocument.name)
  readonly retailerModel: Model<RetailerDocument>;

  async create(createRetailerDto: CreateRetailerDto) {
    const retailer = await this.findOne(createRetailerDto.nin);

    if (retailer) {
      throw new ConflictException('C.P.F. já cadastrado');
    }

    await new this.retailerModel({
      ...createRetailerDto,
      password: await this.bcryptService.createPassword(
        createRetailerDto.password,
      ),
    }).save();
  }

  findAll() {
    return this.retailerModel.find().select('-password').exec();
  }

  findOne(username: string) {
    return this.retailerModel
      .findOne({
        nin: username,
      })
      .exec();
  }
}
