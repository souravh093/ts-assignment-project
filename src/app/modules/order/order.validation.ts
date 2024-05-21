import { z } from 'zod';

// order validation schema
const OrderValidationSchema = z.object({
  email: z.string({ message: 'Email is Required' }).email(),
  productId: z.string({ message: 'Product Id is Required' }).min(1),
  price: z.number({ message: 'Price is Required' }).positive().min(1),
  quantity: z.number({ message: 'Quantity is Required' }).positive().min(1),
});

export default OrderValidationSchema;
