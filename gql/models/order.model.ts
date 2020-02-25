import { Schema, Document, model, Model } from 'mongoose';
import { IProduct } from '../models/product.model';
import { IUser } from '../models/user.model';

export interface IOrder extends Document {
  amount: number;
  user: IUser;
  products: IProduct[];
  stripeChargeToken: string;
}

// Create Order Schema
const orderSchema: Schema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product',
      },
    ],
    stripeChargeToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> = model<IOrder>('order', orderSchema);
