import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { OrderedDocument } from './entities/ordered.entity';
import { CreateOrderedDto } from './dto/create-ordered.dto';
import { UpdateOrderedDto } from './dto/update-ordered.dto';

@Injectable()
export class OrderedService {
  @InjectModel(OrderedDocument.name)
  readonly retailerModel: Model<OrderedDocument>;

  async create(createOrderedDto: CreateOrderedDto) {
    await new this.retailerModel({
      ...createOrderedDto,
    }).save();
  }

  findAll() {
    return `This action returns all ordered`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordered`;
  }

  update(id: number, updateOrderedDto: UpdateOrderedDto) {
    return `This action updates a #${id} ordered`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordered`;
  }
}
