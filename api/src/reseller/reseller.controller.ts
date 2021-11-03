import {
  Post,
  Body,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { ResellerService } from './reseller.service';
import { CreateResellerDto } from './dto/create-reseller.dto';

@ApiTags('reseller')
@Controller('reseller')
export class ResellerController {
  constructor(private readonly resellerService: ResellerService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  @ApiOperation({
    summary:
      'Rota para cadastrar um novo revendedor(a) exigindo no mínimo ' +
      'nome completo, CPF, e- mail e senha',
  })
  @ApiCreatedResponse({ description: 'Revendedor registrado.' })
  @ApiConflictResponse({ description: 'CPF ou E-mail já cadastrado.' })
  create(@Body() createResellerDto: CreateResellerDto) {
    return this.resellerService.create(createResellerDto);
  }
}
