import {
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common';

import { ResellerService } from './reseller.service';
import { CreateResellerDto } from './dto/create-reseller.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  create(@Body() createResellerDto: CreateResellerDto) {
    return this.resellerService.create(createResellerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.resellerService.findAll();
  }
}
