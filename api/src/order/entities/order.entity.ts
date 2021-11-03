import { Document, PreSaveMiddlewareFunction, Schema as MongooseSchema } from 'mongoose';
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

export const OrderModel = <ModelDefinition>{
  name: OrderDocument.name,
  schema: OrderSchema,
};
