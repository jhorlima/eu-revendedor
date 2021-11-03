import {
  Post,
  Body,
  Inject,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { JwtDto } from './dto/jwt.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  readonly authService: AuthService;

  @Post('login')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  @ApiOkResponse({
    description: 'Autenticação permitida.',
    type: JwtDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Sem permissão.',
  })
  login(@Body() login: LoginDto) {
    return this.authService.login(login.nin, login.password);
  }
}
