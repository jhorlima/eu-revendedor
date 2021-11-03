import { Document, Schema as MongooseSchema } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  Reseller,
  ResellerDocument,
} from '../../reseller/entities/reseller.entity';

export enum OrderStatus {
  approved = 'Aprovado',
  in_validation = 'Em validação',
}

export interface Order {
  code: string;
  value: number;
  date: Date;
  status: OrderStatus;
  reseller: Reseller;
}

@Schema({
  timestamps: true,
  collection: 'orders',
})
export class OrderDocument extends Document implements Order {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, enum: OrderStatus })
  status: OrderStatus;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: ResellerDocument.name,
    required: true,
  })
  reseller: Reseller;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);

OrderSchema.pre('save', function (next) {
  const approvedResellers = JSON.parse(
    process.env.APPROVED_RESELLERS,
  ) as string[];

  if (approvedResellers.includes(this.reseller.nin)) {
    this.status = OrderStatus.approved;
  }

  next();
});

export const OrderModel = <ModelDefinition>{
  name: OrderDocument.name,
  schema: OrderSchema,
};
