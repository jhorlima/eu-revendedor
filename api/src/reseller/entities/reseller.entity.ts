import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Reseller {
  nin: string;
  fullName: string;
  email: string;
  password: string;
}

@Schema({
  timestamps: true,
  collection: 'resellers',
})
export class ResellerDocument extends Document implements Reseller {
  @Prop({ required: true, unique: true })
  nin: string;

  @Prop({ required: true, minlength: 1, maxlength: 100 })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const ResellerSchema = SchemaFactory.createForClass(ResellerDocument);

export const ResellerModel = <ModelDefinition>{
  name: ResellerDocument.name,
  schema: ResellerSchema,
};
