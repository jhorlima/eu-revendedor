import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { ResellerDocument } from './entities/reseller.entity';
import { CreateResellerDto } from './dto/create-reseller.dto';

import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class ResellerService {
  @Inject()
  readonly bcryptService: BcryptService;

  @InjectModel(ResellerDocument.name)
  readonly resellerModel: Model<ResellerDocument>;

  async create(createResellerDto: CreateResellerDto) {
    const reseller = await this.findOne(createResellerDto.nin);

    if (reseller) {
      throw new ConflictException('C.P.F. já cadastrado');
    }

    await new this.resellerModel({
      ...createResellerDto,
      password: await this.bcryptService.createPassword(
        createResellerDto.password,
      ),
    }).save();
  }

  findAll() {
    return this.resellerModel.find().select('-password').exec();
  }

  findOne(username: string) {
    return this.resellerModel
      .findOne({
        nin: username,
      })
      .exec();
  }
}
