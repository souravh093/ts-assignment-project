import { TProduct } from './product.interface';
import { Product } from './product.modal';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);

  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
