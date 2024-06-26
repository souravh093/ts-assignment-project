import { TProduct } from './product.interface';
import { Product } from './product.modal';

// create product with valid data using mongoose
const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);

  return result;
};

// get all product and search from db query using mongoose
const getAllProductIntoDB = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await Product.find({
      name: { $regex: searchTerm, $options: 'i' },
    });

    return result;
  } else {
    const result = await Product.find();

    return result;
  }
};

// get single product form db query using mongoose
const getSingleProductIntoDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });

  return result;
};

// update single product form db query using mongoose
const updateProductIntoDB = async (productId: string, product: TProduct) => {
  const result = await Product.updateOne({ _id: productId }, { $set: product });

  return result;
};

// delete product form db query using mongoose
const deleteProductIntoDB = async (productId: string) => {
  const result = await Product.deleteOne({ _id: productId });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
