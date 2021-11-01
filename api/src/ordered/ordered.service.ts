import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateOrderedDto } from './dto/create-ordered.dto';
import { UpdateOrderedDto } from './dto/update-ordered.dto';
import { OrderedDocument, OrderedStatus } from './entities/ordered.entity';

import { ResellerService } from '../reseller/reseller.service';

@Injectable()
export class OrderedService {
  @InjectModel(OrderedDocument.name)
  readonly orderedModel: Model<OrderedDocument>;

  @Inject()
  readonly resellerService: ResellerService;

  async create(createOrderedDto: CreateOrderedDto) {
    const reseller = await this.resellerService.findOne(
      createOrderedDto.resellerNin,
    );

    if (!reseller) {
      throw new NotFoundException('Revendedor não encontrado!');
    }

    await new this.orderedModel({
      ...createOrderedDto,
      status: OrderedStatus.in_validation,
      cashback: 0.2, // TODO: Apagar
      reseller,
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
