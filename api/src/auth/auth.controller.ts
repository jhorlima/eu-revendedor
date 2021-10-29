import {
  Post,
  Body,
  Inject,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common';

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
  login(@Body() login: LoginDto) {
    return this.authService.login(login.nin, login.password);
  }
}
