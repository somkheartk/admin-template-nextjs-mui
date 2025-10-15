import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true, uppercase: true })
  sku: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  category: string;

  @Prop({ required: true, min: 0, default: 0 })
  quantity: number;

  @Prop({ required: true, min: 0, default: 10 })
  minQuantity: number;

  @Prop({ required: true, default: 'pcs' })
  unit: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ trim: true })
  location: string;

  @Prop()
  createdBy: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
