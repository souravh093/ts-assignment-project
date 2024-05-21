"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
// variant validation schema
const variantsSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, 'Type is required'),
    value: zod_1.z.string().min(1, 'Value is required'),
});
// inventory validation schema
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .min(0, { message: 'Quantity must be a positive number' }),
    inStock: zod_1.z.boolean().default(true),
});
// product validation schema
exports.ProductValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Product name minimum 2 Characters')
        .max(200, 'Product name maximum 200 Characters '),
    description: zod_1.z.string({ message: 'Description is Required' }),
    price: zod_1.z.number({ message: 'Price is Required' }),
    category: zod_1.z.string({ message: 'Category is Required' }),
    tags: zod_1.z.array(zod_1.z.string()).min(1, { message: 'At least one tag is required' }),
    variants: zod_1.z.array(variantsSchema),
    inventory: inventorySchema,
});
exports.default = exports.ProductValidationSchema;
