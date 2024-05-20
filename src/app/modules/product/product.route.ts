import { Router } from 'express';
import { ProductController } from './product.controller';

// call the Router form express
const router = Router();

// All product routes here blow

// create product route
router.post('/', ProductController.createProduct);

// get all product route
router.get('/', ProductController.getAllProduct);

// get single product route
router.get('/:productId', ProductController.getSingleProduct);

// update single product route
router.put('/:productId', ProductController.updateProduct);

// delete product route
router.delete('/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
