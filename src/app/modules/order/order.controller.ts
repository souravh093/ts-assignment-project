import { Request, Response } from 'express';
import OrderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

// create order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    // get order data form client
    const order = req.body;

    // validation order using zod
    const validateOrderData = OrderValidationSchema.parse(order);

    // call service and create order
    const result = await OrderServices.createOrderIntoDB(validateOrderData);

    // response return data
    return res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // send error response to the client
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

// getall orders controller or email by orders
const getAllOrder = async (req: Request, res: Response) => {
  try {
    // get email by query
    const { email } = req.query;
    // get all order
    const result = await OrderServices.getAllOrderIntoDB(email as string);

    // response all order data
    return res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully!'
        : 'Orders fetched successfully for user email!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // send error response to the client
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
};
