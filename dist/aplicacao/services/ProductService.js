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
exports.ProductService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../infraestrutura/container/types");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getAllProducts() {
        try {
            return await this.productRepository.findAll();
        }
        catch (error) {
            console.error('Erro no serviço ao buscar todos os produtos:', error);
            throw error;
        }
    }
    async getProductById(id) {
        try {
            if (!id || id.trim() === '') {
                throw new Error('ID do produto é obrigatório');
            }
            return await this.productRepository.findById(id);
        }
        catch (error) {
            console.error('Erro no serviço ao buscar produto por ID:', error);
            throw error;
        }
    }
    async createProduct(productData) {
        try {
            this.validateProductData(productData);
            const existingProducts = await this.productRepository.findAll();
            const duplicateProduct = existingProducts.find(p => p.name.toLowerCase() === productData.name.toLowerCase());
            if (duplicateProduct) {
                throw new Error('Já existe um produto com este nome');
            }
            return await this.productRepository.create(productData);
        }
        catch (error) {
            console.error('Erro no serviço ao criar produto:', error);
            throw error;
        }
    }
    async updateProduct(id, productData) {
        try {
            if (!id || id.trim() === '') {
                throw new Error('ID do produto é obrigatório');
            }
            const existingProduct = await this.productRepository.findById(id);
            if (!existingProduct) {
                return null;
            }
            if (productData.name && productData.name !== existingProduct.name) {
                const allProducts = await this.productRepository.findAll();
                const duplicateProduct = allProducts.find(p => p.id !== id && p.name.toLowerCase() === productData.name.toLowerCase());
                if (duplicateProduct) {
                    throw new Error('Já existe um produto com este nome');
                }
            }
            return await this.productRepository.update(id, productData);
        }
        catch (error) {
            console.error('Erro no serviço ao atualizar produto:', error);
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            if (!id || id.trim() === '') {
                throw new Error('ID do produto é obrigatório');
            }
            const existingProduct = await this.productRepository.findById(id);
            if (!existingProduct) {
                return false;
            }
            return await this.productRepository.delete(id);
        }
        catch (error) {
            console.error('Erro no serviço ao deletar produto:', error);
            throw error;
        }
    }
    async getProductsByCategory(category) {
        try {
            if (!category || category.trim() === '') {
                throw new Error('Categoria é obrigatória');
            }
            return await this.productRepository.findByCategory(category);
        }
        catch (error) {
            console.error('Erro no serviço ao buscar produtos por categoria:', error);
            throw error;
        }
    }
    async getActiveProducts() {
        try {
            return await this.productRepository.findActiveProducts();
        }
        catch (error) {
            console.error('Erro no serviço ao buscar produtos ativos:', error);
            throw error;
        }
    }
    validateProductData(productData) {
        if (!productData.name || productData.name.trim() === '') {
            throw new Error('Nome do produto é obrigatório');
        }
        if (!productData.description || productData.description.trim() === '') {
            throw new Error('Descrição do produto é obrigatória');
        }
        if (productData.price === undefined || productData.price === null) {
            throw new Error('Preço do produto é obrigatório');
        }
        if (productData.price < 0) {
            throw new Error('Preço não pode ser negativo');
        }
        if (!productData.category || productData.category.trim() === '') {
            throw new Error('Categoria do produto é obrigatória');
        }
        if (productData.stock === undefined || productData.stock === null) {
            throw new Error('Estoque do produto é obrigatório');
        }
        if (productData.stock < 0) {
            throw new Error('Estoque não pode ser negativo');
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ProductRepository)),
    __metadata("design:paramtypes", [Object])
], ProductService);
//# sourceMappingURL=ProductService.js.map