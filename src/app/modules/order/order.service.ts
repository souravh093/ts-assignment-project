import { TOrder } from './order.interface';
import { Order } from './order.modal';

// create order with validated mongoose
const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);

  return result;
};

// get all orders or email by order with validated mongoose
const getAllOrderIntoDB = async (email: string) => {
  if (email) {
    const result = await Order.find({ email });

    return result;
  } else {
    const result = await Order.find();

    return result;
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderIntoDB,
};
