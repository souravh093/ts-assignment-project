import { Request, Response } from 'express';
import ProductValidationSchema from './product.validation';
import { ProductServices } from './product.service';

// create product controller
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

// get products controller
const getAllProduct = async (req: Request, res: Response) => {
  try {
    // get product using call service function
    const result = await ProductServices.getAllProductIntoDB();

    // response for get all product
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

// get single product controller
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // get single product using id
    const result = await ProductServices.getSingleProductIntoDB(productId);

    // response for get single product
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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

// update product controller
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;

    // update data pass two arguments
    const result = await ProductServices.updateProductIntoDB(
      productId,
      product,
    );

    // response data
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // update data pass two arguments
    const result = await ProductServices.deleteProductIntoDB(productId);

    // response data
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
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
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
