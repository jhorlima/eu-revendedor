import { Injectable } from '@nestjs/common';
import { CreateOrderedDto } from './dto/create-ordered.dto';
import { UpdateOrderedDto } from './dto/update-ordered.dto';

@Injectable()
export class OrderedService {
  create(createOrderedDto: CreateOrderedDto) {
    return 'This action adds a new ordered';
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
