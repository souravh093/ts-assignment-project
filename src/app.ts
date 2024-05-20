import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);

// home route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Server is running...',
  });
});

export default app;
