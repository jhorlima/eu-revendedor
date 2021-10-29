import {
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common';

import { OrderedService } from './ordered.service';
import { CreateOrderedDto } from './dto/create-ordered.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ordered')
export class OrderedController {
  constructor(private readonly orderedService: OrderedService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  create(@Body() createOrderedDto: CreateOrderedDto) {
    return this.orderedService.create(createOrderedDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.orderedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderedService.findOne(+id);
  }
}
