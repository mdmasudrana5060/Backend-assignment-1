import { z } from 'zod';

const variantSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Inventory Schema
const inventorySchema = z.object({
  quantity: z
    .number()
    .min(0, 'Quantity cannot be negative')
    .int()
    .nonnegative(),
  inStock: z.boolean(),
});

// Product Schema
const productValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is needed'),
  price: z.number().positive('Product price must be greater than zero'),

  category: z.string().min(1, 'Product category is required'),
  tags: z.array(z.string()).min(1, 'Product tags are required'),

  variants: z.array(variantSchema).min(1, 'Product variants are required'),

  inventory: inventorySchema,
});

// Export the schemas for use in validation
export default productValidationSchema;
