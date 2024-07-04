import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email('Invalid email format'),
  productId: z.string().min(1, 'Product ID is required'),
  price: z.number().positive('Price must be a positive number'),
  quantity: z
    .number()
    .int()
    .positive('Quantity must be a positive integer')
    .min(1, 'Quantity must be at least 1'),
});

export default orderValidationSchema;
