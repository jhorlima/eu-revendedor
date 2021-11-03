import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { BcryptService } from '../bcrypt/bcrypt.service';
import { ResellerService } from '../reseller/reseller.service';
import { Reseller } from '../reseller/entities/reseller.entity';

@Injectable()
export class AuthService {
  @Inject()
  readonly jwtService: JwtService;

  @Inject()
  readonly bcryptService: BcryptService;

  @Inject()
  readonly resellerService: ResellerService;

  async validateUser(username: string): Promise<Reseller | null> {
    const user = await this.resellerService.findOne(username);
    return user ? user.toObject() : null;
  }

  async login(username: string, password: string) {
    const user = await this.resellerService
      .findResellerWithPassword(username)
      .catch(() => {
        throw new UnauthorizedException();
      });

    if (!(await this.bcryptService.comparePassword(password, user.password))) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({
        sub: user.nin,
        email: user.email,
        display_name: user.fullName,
      }),
    };
  }
}
