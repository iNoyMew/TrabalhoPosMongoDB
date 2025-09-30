"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const inversify_1 = require("inversify");
const ProductSchema_1 = require("../database/schemas/ProductSchema");
let ProductRepository = class ProductRepository {
    async findAll() {
        try {
            const products = await ProductSchema_1.ProductModel.find({}).sort({ createdAt: -1 });
            return products.map(this.mapToProduct);
        }
        catch (error) {
            console.error('Erro ao buscar todos os produtos:', error);
            throw new Error('Erro interno do servidor ao buscar produtos');
        }
    }
    async findById(id) {
        try {
            if (!this.isValidObjectId(id)) {
                return null;
            }
            const product = await ProductSchema_1.ProductModel.findById(id);
            return product ? this.mapToProduct(product) : null;
        }
        catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
            throw new Error('Erro interno do servidor ao buscar produto');
        }
    }
    async create(productData) {
        try {
            const product = new ProductSchema_1.ProductModel({
                ...productData,
                isActive: true
            });
            const savedProduct = await product.save();
            return this.mapToProduct(savedProduct);
        }
        catch (error) {
            console.error('Erro ao criar produto:', error);
            if (error instanceof Error && error.name === 'ValidationError') {
                throw new Error('Dados do produto inválidos');
            }
            throw new Error('Erro interno do servidor ao criar produto');
        }
    }
    async update(id, productData) {
        try {
            if (!this.isValidObjectId(id)) {
                return null;
            }
            const updatedProduct = await ProductSchema_1.ProductModel.findByIdAndUpdate(id, { ...productData, updatedAt: new Date() }, { new: true, runValidators: true });
            return updatedProduct ? this.mapToProduct(updatedProduct) : null;
        }
        catch (error) {
            console.error('Erro ao atualizar produto:', error);
            if (error instanceof Error && error.name === 'ValidationError') {
                throw new Error('Dados do produto inválidos');
            }
            throw new Error('Erro interno do servidor ao atualizar produto');
        }
    }
    async delete(id) {
        try {
            if (!this.isValidObjectId(id)) {
                return false;
            }
            const result = await ProductSchema_1.ProductModel.findByIdAndDelete(id);
            return result !== null;
        }
        catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw new Error('Erro interno do servidor ao deletar produto');
        }
    }
    async findByCategory(category) {
        try {
            const products = await ProductSchema_1.ProductModel.find({
                category: { $regex: category, $options: 'i' }
            }).sort({ createdAt: -1 });
            return products.map(this.mapToProduct);
        }
        catch (error) {
            console.error('Erro ao buscar produtos por categoria:', error);
            throw new Error('Erro interno do servidor ao buscar produtos por categoria');
        }
    }
    async findActiveProducts() {
        try {
            const products = await ProductSchema_1.ProductModel.find({ isActive: true }).sort({ createdAt: -1 });
            return products.map(this.mapToProduct);
        }
        catch (error) {
            console.error('Erro ao buscar produtos ativos:', error);
            throw new Error('Erro interno do servidor ao buscar produtos ativos');
        }
    }
    mapToProduct(productDoc) {
        return {
            id: productDoc._id.toString(),
            name: productDoc.name,
            description: productDoc.description,
            price: productDoc.price,
            category: productDoc.category,
            stock: productDoc.stock,
            isActive: productDoc.isActive,
            createdAt: productDoc.createdAt,
            updatedAt: productDoc.updatedAt
        };
    }
    isValidObjectId(id) {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, inversify_1.injectable)()
], ProductRepository);
//# sourceMappingURL=ProductRepository.js.map