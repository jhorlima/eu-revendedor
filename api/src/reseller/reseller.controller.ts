import {
  Post,
  Body,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { ResellerService } from './reseller.service';
import { CreateResellerDto } from './dto/create-reseller.dto';

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
  @ApiCreatedResponse({ description: 'Revendedor registrado.' })
  @ApiConflictResponse({ description: 'C.P.F. já cadastrado.' })
  create(@Body() createResellerDto: CreateResellerDto) {
    return this.resellerService.create(createResellerDto);
  }
}
