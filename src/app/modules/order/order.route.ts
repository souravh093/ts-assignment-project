import { Router } from 'express';
import { OrderController } from './order.controller';

// call the Router form express
const router = Router();

// create order route
router.post('/', OrderController.createOrder);

// getall order route
router.get('/', OrderController.getAllOrder);

export const OrderRoutes = router;
