import mongoose, { Schema, Model } from 'mongoose';
import { IProduct } from '@/types';

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'Please provide a SKU'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide a quantity'],
      min: 0,
      default: 0,
    },
    minQuantity: {
      type: Number,
      required: [true, 'Please provide a minimum quantity'],
      min: 0,
      default: 10,
    },
    unit: {
      type: String,
      required: [true, 'Please provide a unit'],
      default: 'pcs',
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    location: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
