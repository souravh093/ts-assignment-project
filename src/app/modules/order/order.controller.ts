import { Request, Response } from 'express';
import OrderValidationSchema from './order.validation';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';
import { ZodError } from 'zod';

// create order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    // get order data form client
    const order = req.body;

    // validation order using zod
    const validateOrderData = OrderValidationSchema.parse(order);

    // get product details
    const product = await ProductServices.getSingleProductIntoDB(
      validateOrderData.productId,
    );

    // if product not found then rend message
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // if the ordered quantity is gather then product quantity
    if (validateOrderData.quantity > product.inventory.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // update product inventory quantity and inStock
    product.inventory.quantity -= validateOrderData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    // update the product using the order data following
    await ProductServices.updateProductIntoDB(product._id.toString(), product);

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
    if (error instanceof ZodError) {
      const errorMessage = error.issues.map((issue) => issue.message);

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessage,
      });
    }
    // send error response to the client
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

// get all orders controller or email by orders
const getAllOrder = async (req: Request, res: Response) => {
  try {
    // get email by query
    const { email } = req.query;
    // get all order
    const result = await OrderServices.getAllOrderIntoDB(email as string);

    // response all order data
    return res.status(200).json({
      success: result.length === 0 ? false : true,
      message:
        email && result.length > 0
          ? 'Orders fetched successfully for user email!'
          : result.length === 0
            ? 'Order not found'
            : 'Orders fetched successfully!',
      data: result.length > 0 ? result : null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errorMessage = error.issues.map((issue) => issue.message);

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessage,
      });
    }
    // send error response to the client
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
};
