import { Router } from 'express';
import { container } from '../../infraestrutura/container/container';
import { TYPES } from '../../infraestrutura/container/types';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const productController = container.get<ProductController>(TYPES.ProductController);

router.get('/', (req, res) => productController.getAllProducts(req, res));
router.get('/active', (req, res) => productController.getActiveProducts(req, res));
router.get('/category/:category', (req, res) => productController.getProductsByCategory(req, res));
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.post('/', (req, res) => productController.createProduct(req, res));
router.put('/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

export default router;