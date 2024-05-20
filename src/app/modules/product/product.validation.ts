import { z } from 'zod';

// variant validation schema
const variantsSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
});

// inventory validation schema
const inventorySchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number' }),
  inStock: z.boolean().default(true),
});

// product validation schema
export const ProductValidationSchema = z.object({
  name: z
    .string()
    .min(2, 'Product name minimum 2 Characters')
    .max(200, 'Product name maximum 200 Characters '),
  description: z.string({ message: 'Description is Required' }),
  price: z.number({ message: 'Price is Required' }),
  category: z.string({ message: 'Category is Required' }),
  tags: z.array(z.string()).min(1, { message: 'At least one tag is required' }),
  variants: z.array(variantsSchema),
  inventory: inventorySchema,
});

export default ProductValidationSchema;
