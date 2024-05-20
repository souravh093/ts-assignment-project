import { Router } from 'express';
import { ProductController } from './product.controller';

// call the Router form express
const router = Router();

// all product routes here blow
router.post('/', ProductController.createProduct);

export const ProductRoutes = router;
