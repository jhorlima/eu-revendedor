import {
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common';

import { RetailerService } from './retailer.service';
import { CreateRetailerDto } from './dto/create-retailer.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('retailer')
export class RetailerController {
  constructor(private readonly retailerService: RetailerService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  create(@Body() createRetailerDto: CreateRetailerDto) {
    return this.retailerService.create(createRetailerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.retailerService.findAll();
  }
}
