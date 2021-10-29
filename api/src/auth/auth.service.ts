import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { BcryptService } from '../bcrypt/bcrypt.service';
import { RetailerService } from '../retailer/retailer.service';
import { Retailer } from '../retailer/entities/retailer.entity';

@Injectable()
export class AuthService {
  @Inject()
  readonly jwtService: JwtService;

  @Inject()
  readonly bcryptService: BcryptService;

  @Inject()
  readonly retailerService: RetailerService;

  async validateUser(
    username: string,
  ): Promise<Pick<Retailer, 'nin' | 'fullName' | 'email'> | null> {
    const user = await this.retailerService.findOne(username);

    if (user) {
      return {
        nin: user.nin,
        email: user.email,
        fullName: user.fullName,
      };
    }

    return null;
  }

  async login(username: string, password: string) {
    const user = await this.retailerService.findOne(username);

    if (
      !user ||
      !(await this.bcryptService.comparePassword(password, user.password))
    ) {
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
