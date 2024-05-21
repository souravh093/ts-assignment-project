import { z } from 'zod';

// order validation schema
const OrderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

export default OrderValidationSchema;
