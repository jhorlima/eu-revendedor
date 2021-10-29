import { Document, Schema as MongooseSchema } from 'mongoose';
import { ModelDefinition, Prop, SchemaFactory } from '@nestjs/mongoose';

import {
  Retailer,
  RetailerDocument,
} from '../../retailer/entities/retailer.entity';

export enum OrderedStatus {
  approved = 'Aprovado',
  in_validation = 'Em validação',
}

export interface Ordered {
  code: string;
  value: number;
  date: Date;
  cashback: number;
  usedCashback: boolean;
  status: OrderedStatus;
  retailer: Retailer;
}

export class OrderedDocument extends Document implements Ordered {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  cashback: number;

  @Prop({ required: true })
  usedCashback: boolean;

  @Prop({ required: true, enum: OrderedStatus })
  status: OrderedStatus;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: RetailerDocument.name,
    required: true,
  })
  retailer: Retailer;
}

export const OrderedSchema = SchemaFactory.createForClass(OrderedDocument);

export const OrderedModel = <ModelDefinition>{
  name: OrderedDocument.name,
  schema: OrderedSchema,
};
