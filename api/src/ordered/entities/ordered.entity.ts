import { Document, Schema as MongooseSchema } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  Reseller,
  ResellerDocument,
} from '../../reseller/entities/reseller.entity';

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
  reseller: Reseller;
}

@Schema({
  timestamps: true,
  collection: 'ordereds',
})
export class OrderedDocument extends Document implements Ordered {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, min: 0, max: 1 })
  cashback: number;

  @Prop({ required: true })
  usedCashback: boolean;

  @Prop({ required: true, enum: OrderedStatus })
  status: OrderedStatus;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: ResellerDocument.name,
    required: true,
  })
  reseller: Reseller;
}

export const OrderedSchema = SchemaFactory.createForClass(OrderedDocument);

export const OrderedModel = <ModelDefinition>{
  name: OrderedDocument.name,
  schema: OrderedSchema,
};
