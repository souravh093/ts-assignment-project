import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

// order schema
const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// create order modal using mongoose
export const Order = model<TOrder>('Order', orderSchema);
