import { Model } from 'mongoose';
import { format as formatDate } from 'date-fns';

import { InjectModel } from '@nestjs/mongoose';
import {
  Logger,
  Inject,
  Injectable,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { ListOrderDto } from './dto/list-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument, OrderStatus } from './entities/order.entity';

import { ResellerService } from '../reseller/reseller.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  @InjectModel(OrderDocument.name)
  readonly orderModel: Model<OrderDocument>;

  @Inject()
  readonly resellerService: ResellerService;

  async create(createOrderDto: CreateOrderDto) {
    try {
      this.logger.log(
        `Registrando um pedido de compra. Código: "${createOrderDto.code}" | Revendedor: "${createOrderDto.resellerNin}".`,
      );
      const reseller = await this.resellerService.findOne(
        createOrderDto.resellerNin,
      );

      if (!reseller) {
        this.logger.warn(
          `Revendedor não encontrado! Código: "${createOrderDto.code}" | Revendedor: "${createOrderDto.resellerNin}"."`,
        );
        throw new NotFoundException(`Revendedor não encontrado!`);
      }

      await new this.orderModel(<Order>{
        reseller: reseller,
        code: createOrderDto.code,
        date: createOrderDto.date,
        value: createOrderDto.value,
        status: OrderStatus.in_validation,
      }).save();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(
        `Ocorreu um erro ao registrar o pedido! Código: "${createOrderDto.code}" | Revendedor: "${createOrderDto.resellerNin}".`,
        error,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(resellerNin: string) {
    try {
      this.logger.log(`Obtendo pedidos. Revendedor: "${resellerNin}".`);

      const orders = await this.orderModel.find().sort({ date: -1 }).exec();
      const purchasesPerMonth = orders.reduce((acc, order) => {
        const monthKey = formatDate(order.date, 'yyyy-MM');

        acc[monthKey] ??= 0;
        acc[monthKey] += order.value;

        return acc;
      }, {} as Map<string, number>);

      return orders.map((order) => {
        const monthKey = formatDate(order.date, 'yyyy-MM');

        return <ListOrderDto>{
          value: order.value,
          date: order.date,
          code: order.code,
          status: order.status,
          ...this.cashbackRules(order, purchasesPerMonth[monthKey]),
        };
      });
    } catch (error) {
      this.logger.error(
        `Ocorreu um erro ao obter pedidos! Revendedor: "${resellerNin}".`,
        error,
      );
      throw new InternalServerErrorException(error);
    }
  }

  private cashbackRules(
    order: Order,
    salesAmountMonth: number,
  ): Pick<ListOrderDto, 'cashbackAmount' | 'cashbackPercentage'> {
    let cashbackPercentage;

    if (salesAmountMonth > 1500) {
      cashbackPercentage = 0.2;
    } else if (salesAmountMonth > 1000) {
      cashbackPercentage = 0.15;
    } else {
      cashbackPercentage = 0.1;
    }

    return {
      cashbackAmount: order.value * cashbackPercentage,
      cashbackPercentage,
    };
  }
}
