/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import ProductValidationSchema from './product.validation';
import { ProductServices } from './product.service';

// create product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    // get product data from client side
    const product = req.body;

    // validation data using zod
    const validateProductData = ProductValidationSchema.parse(product);

    // create product
    const result =
      await ProductServices.createProductIntoDB(validateProductData);

    //   send response to the client
    return res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    // send error response to the client
    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

// get products controller
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    // get product using call service function
    const result = await ProductServices.getAllProductIntoDB(
      searchTerm as string,
    );

    // response for get all product
    res.status(200).json({
      success: result.length > 0 ? true : false,
      message:
        searchTerm && result.length > 0
          ? `Products matching search term ${searchTerm} fetched successfully!`
          : result.length === 0
            ? 'Product not found'
            : 'Products fetched successfully!',
      data: result.length > 0 ? result : null,
    });
  } catch (error: any) {
    // send error response to the client
    return res.status(500).json({
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
    return res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    // send error response to the client
    return res.status(500).json({
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

    // validate data using zod
    const updateValidateData = ProductValidationSchema.parse(product);

    // update data pass two arguments
    const result = await ProductServices.updateProductIntoDB(
      productId,
      updateValidateData,
    );

    if (!result) {
      return;
    }

    // response data
    return res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: any) {
    // send error response to the client
    return res.status(500).json({
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
    await ProductServices.deleteProductIntoDB(productId);

    // response data
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    // send error response to the client
    return res.status(500).json({
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
