import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Logger,
  Inject,
  Injectable,
  HttpException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ResellerDocument } from './entities/reseller.entity';
import { CreateResellerDto } from './dto/create-reseller.dto';

import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class ResellerService {
  private readonly logger = new Logger(ResellerService.name);

  @Inject()
  readonly bcryptService: BcryptService;

  @InjectModel(ResellerDocument.name)
  readonly resellerModel: Model<ResellerDocument>;

  async create(createResellerDto: CreateResellerDto) {
    try {
      this.logger.log(
        `Registrando um revendedor. Código: Revendedor: "${createResellerDto.nin}".`,
      );

      const reseller = await this.findResellerNinOrEmail(
        createResellerDto.nin,
        createResellerDto.email,
      );

      if (reseller) {
        this.logger.warn(
          `CPF ou E-mail já cadastrado! Revendedor: "${createResellerDto.nin}" | E-mail: "${createResellerDto.email}".`,
        );
        throw new ConflictException('CPF ou E-mail já cadastrado');
      }

      await new this.resellerModel({
        ...createResellerDto,
        password: await this.bcryptService.createPassword(
          createResellerDto.password,
        ),
      }).save();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(
        `Ocorreu um erro ao cadastrar o revendedor! Revendedor: "${createResellerDto.nin}".`,
        error,
      );
      throw new InternalServerErrorException(error);
    }
  }

  findOne(nin: string) {
    return this.resellerModel
      .findOne({
        nin,
      })
      .select('-password')
      .exec();
  }

  async findResellerWithPassword(nin: string) {
    try {
      this.logger.log(
        `Buscando revendedor com senha. Código: Revendedor: "${nin}".`,
      );

      const reseller = await this.resellerModel.findOne({ nin }).exec();

      if (!reseller) {
        this.logger.warn(`Revendedor não encontrado! Revendedor: "${nin}"."`);
        throw new NotFoundException(`Revendedor não encontrado!`);
      }

      return reseller;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(
        `Ocorreu um erro ao buscar o revendedor! Revendedor: "${nin}".`,
        error,
      );
      throw new InternalServerErrorException(error);
    }
  }

  findResellerNinOrEmail(nin: string, email: string) {
    return this.resellerModel
      .findOne({
        $or: [{ nin }, { email }],
      })
      .exec();
  }
}
