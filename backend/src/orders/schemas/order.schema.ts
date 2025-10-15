import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  price: number;
}

export enum OrderType {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, unique: true })
  orderNumber: string;

  @Prop({ 
    type: String, 
    enum: Object.values(OrderType), 
    required: true 
  })
  type: OrderType;

  @Prop({ 
    type: String, 
    enum: Object.values(OrderStatus), 
    default: OrderStatus.PENDING 
  })
  status: OrderStatus;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ min: 0 })
  totalAmount: number;

  @Prop({ trim: true })
  notes: string;

  @Prop()
  createdBy: string;

  @Prop()
  processedBy: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
