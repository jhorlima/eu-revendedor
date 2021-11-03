import {
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { OrderService } from './order.service';
import { ListOrderDto } from './dto/list-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

import { User } from '../auth/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  @ApiCreatedResponse({ description: 'Pedido registrado.' })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @ApiNotFoundResponse({ description: 'CPF de revendedor inválido.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Lista de pedidos do revendedor.',
    type: [ListOrderDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Sem permissão.',
  })
  findAll(@User('nin') cpf: string) {
    return this.orderService.findAll(cpf);
  }
}
