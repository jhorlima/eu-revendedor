import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Retailer {
  nin: string;
  fullName: string;
  email: string;
  password: string;
}

@Schema({
  timestamps: true,
  collection: 'retailers',
})
export class RetailerDocument extends Document implements Retailer {
  @Prop({ required: true, unique: true })
  nin: string;

  @Prop({ required: true, minlength: 1, maxlength: 100 })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const RetailerSchema = SchemaFactory.createForClass(RetailerDocument);

export const RetailerModel = <ModelDefinition>{
  name: RetailerDocument.name,
  schema: RetailerSchema,
};
