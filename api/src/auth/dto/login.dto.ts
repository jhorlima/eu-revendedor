import { CpfValidator } from '../../shared/cpf.validator';
import { IsString, Length, Matches, Validate } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/)
  @Validate(CpfValidator)
  nin: string;

  @IsString()
  @Length(6, 14)
  password: string;
}
