import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Hello World.',
  })
  @ApiOkResponse({
    description: 'Hello World.',
  })
  getHello(): string {
    return 'Hello World! :D';
  }
}
