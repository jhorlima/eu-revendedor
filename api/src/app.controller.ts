import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    description: 'Hello World.',
  })
  getHello(): string {
    return 'Hello World! :D';
  }
}
