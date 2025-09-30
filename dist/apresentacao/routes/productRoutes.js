"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../infraestrutura/container/container");
const types_1 = require("../../infraestrutura/container/types");
const router = (0, express_1.Router)();
const productController = container_1.container.get(types_1.TYPES.ProductController);
router.get('/', (req, res) => productController.getAllProducts(req, res));
router.get('/active', (req, res) => productController.getActiveProducts(req, res));
router.get('/category/:category', (req, res) => productController.getProductsByCategory(req, res));
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.post('/', (req, res) => productController.createProduct(req, res));
router.put('/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));
exports.default = router;
//# sourceMappingURL=productRoutes.js.map