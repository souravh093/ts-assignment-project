import { Request, Response } from 'express';
import ProductValidationSchema from './product.validation';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    // get product from client side
    const product = req.body;

    // validation data using zod
    const validateProductData = ProductValidationSchema.parse(product);

    // create product
    const result =
      await ProductServices.createProductIntoDB(validateProductData);

    //   send response to the client
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    // send error response to the client
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

export const ProductController = {
  createProduct,
};
