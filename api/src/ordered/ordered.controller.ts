import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderedService } from './ordered.service';
import { CreateOrderedDto } from './dto/create-ordered.dto';
import { UpdateOrderedDto } from './dto/update-ordered.dto';

@Controller('ordered')
export class OrderedController {
  constructor(private readonly orderedService: OrderedService) {}

  @Post()
  create(@Body() createOrderedDto: CreateOrderedDto) {
    return this.orderedService.create(createOrderedDto);
  }

  @Get()
  findAll() {
    return this.orderedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderedDto: UpdateOrderedDto) {
    return this.orderedService.update(+id, updateOrderedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderedService.remove(+id);
  }
}
