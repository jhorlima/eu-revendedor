import {
  Post,
  Body,
  Inject,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtDto } from './dto/jwt.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
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
  @ApiOperation({
    summary: 'Rota para validar um login de um revendedor(a)',
  })
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
