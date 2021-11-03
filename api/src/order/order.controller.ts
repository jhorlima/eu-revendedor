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
  ApiTags,
  ApiOperation,
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

@ApiTags('order')
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
  @ApiOperation({
    summary:
      'Rota para cadastrar uma nova compra exigindo no mínimo código, ' +
      'valor, data e CPF do revendedor(a). Todos os cadastros são salvos ' +
      'com o status “Em validação” exceto quando o CPF do revendedor(a) ' +
      'for 153.509.460-56, neste caso o status é salvo como “Aprovado”',
  })
  @ApiCreatedResponse({ description: 'Pedido registrado.' })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @ApiNotFoundResponse({ description: 'CPF de revendedor inválido.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Rota para listar as compras cadastradas retornando código, valor, ' +
      'data, % de cashback aplicado para esta compra, valor de cashback ' +
      'para esta compra e status',
  })
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
