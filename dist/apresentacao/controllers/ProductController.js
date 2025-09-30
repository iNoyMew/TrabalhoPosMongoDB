"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../infraestrutura/container/types");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getAllProducts(req, res) {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json({
                success: true,
                data: products,
                message: 'Produtos recuperados com sucesso',
                count: products.length
            });
        }
        catch (error) {
            this.handleError(res, error, 'Erro ao buscar todos os produtos');
        }
    }
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'ID do produto é obrigatório'
                });
                return;
            }
            const product = await this.productService.getProductById(id);
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: 'Produto não encontrado'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: product,
                message: 'Produto recuperado com sucesso'
            });
        }
        catch (error) {
            this.handleError(res, error, 'Erro ao buscar produto por ID');
        }
    }
    async createProduct(req, res) {
        try {
            const productData = req.body;
            if (!this.validateRequiredFields(productData)) {
                res.status(400).json({
                    success: false,
                    message: 'Todos os campos obrigatórios devem ser preenchidos'
                });
                return;
            }
            const product = await this.productService.createProduct(productData);
            res.status(201).json({
                success: true,
                data: product,
                message: 'Produto criado com sucesso'
            });
        }
        catch (error) {
            const statusCode = this.getErrorStatusCode(error);
            this.handleError(res, error, 'Erro ao criar produto', statusCode);
        }
    }
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'ID do produto é obrigatório'
                });
                return;
            }
            const product = await this.productService.updateProduct(id, productData);
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: 'Produto não encontrado'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: product,
                message: 'Produto atualizado com sucesso'
            });
        }
        catch (error) {
            const statusCode = this.getErrorStatusCode(error);
            this.handleError(res, error, 'Erro ao atualizar produto', statusCode);
        }
    }
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'ID do produto é obrigatório'
                });
                return;
            }
            const deleted = await this.productService.deleteProduct(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Produto não encontrado'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Produto deletado com sucesso'
            });
        }
        catch (error) {
            this.handleError(res, error, 'Erro ao deletar produto');
        }
    }
    async getProductsByCategory(req, res) {
        try {
            const { category } = req.params;
            if (!category) {
                res.status(400).json({
                    success: false,
                    message: 'Categoria é obrigatória'
                });
                return;
            }
            const products = await this.productService.getProductsByCategory(category);
            res.status(200).json({
                success: true,
                data: products,
                message: `Produtos da categoria '${category}' recuperados com sucesso`,
                count: products.length
            });
        }
        catch (error) {
            this.handleError(res, error, 'Erro ao buscar produtos por categoria');
        }
    }
    async getActiveProducts(req, res) {
        try {
            const products = await this.productService.getActiveProducts();
            res.status(200).json({
                success: true,
                data: products,
                message: 'Produtos ativos recuperados com sucesso',
                count: products.length
            });
        }
        catch (error) {
            this.handleError(res, error, 'Erro ao buscar produtos ativos');
        }
    }
    validateRequiredFields(productData) {
        return !!(productData.name &&
            productData.description &&
            productData.price !== undefined &&
            productData.category &&
            productData.stock !== undefined);
    }
    getErrorStatusCode(error) {
        if (error instanceof Error) {
            const message = error.message.toLowerCase();
            if (message.includes('obrigatório') ||
                message.includes('inválidos') ||
                message.includes('existe')) {
                return 400;
            }
        }
        return 500;
    }
    handleError(res, error, message, statusCode = 500) {
        console.error(`${message}:`, error);
        res.status(statusCode).json({
            success: false,
            message: error instanceof Error ? error.message : message,
            error: process.env.NODE_ENV === 'development' ?
                (error instanceof Error ? error.stack : 'Erro desconhecido') :
                undefined
        });
    }
};
exports.ProductController = ProductController;
exports.ProductController = ProductController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ProductService)),
    __metadata("design:paramtypes", [Object])
], ProductController);
//# sourceMappingURL=ProductController.js.map