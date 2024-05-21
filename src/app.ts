import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// home route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Server is running...',
  });
});

// when any route not found then give this message
app.get('*', (req: Request, res: Response) => {
  res.json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
