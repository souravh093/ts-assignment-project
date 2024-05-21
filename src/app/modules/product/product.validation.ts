import { z } from 'zod';

// variant validation schema
const variantsSchema = z.object({
  type: z.string({ message: 'Type is Required' }),
  value: z.string({ message: 'Value is Required' }),
});

// inventory validation schema
const inventorySchema = z.object({
  quantity: z
    .number({ message: 'Quantity is Required' })
    .positive({ message: 'Quantity must be a positive number' }),
  inStock: z.boolean().default(true),
});

// product validation schema
export const ProductValidationSchema = z.object({
  name: z
    .string({ message: 'Name is Required' })
    .min(2, 'Product name minimum 2 Characters')
    .max(200, 'Product name maximum 200 Characters '),
  description: z.string({ message: 'Description is Required' }),
  price: z.number({ message: 'Price is Required' }),
  category: z.string({ message: 'Category is Required' }),
  tags: z
    .array(z.string({ message: 'Tags is Required' }))
    .min(1, { message: 'At least one tag is required' }),
  variants: z.array(variantsSchema),
  inventory: inventorySchema,
});

export default ProductValidationSchema;
