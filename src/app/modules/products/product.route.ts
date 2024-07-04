import express from 'express';
import { productController } from './product.controller';
const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/', productController.searchProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export const ProductRoutes = router;
