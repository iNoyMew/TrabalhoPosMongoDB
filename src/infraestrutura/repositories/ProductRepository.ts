import { injectable } from 'inversify';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../domain/entities/Product';
import { ProductModel } from '../database/schemas/ProductSchema';

@injectable()
export class ProductRepository implements IProductRepository {
  
  async findAll(): Promise<Product[]> {
    try {
      const products = await ProductModel.find({}).sort({ createdAt: -1 });
      return products.map(this.mapToProduct);
    } catch (error) {
      console.error('Erro ao buscar todos os produtos:', error);
      throw new Error('Erro interno do servidor ao buscar produtos');
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      if (!this.isValidObjectId(id)) {
        return null;
      }

      const product = await ProductModel.findById(id);
      return product ? this.mapToProduct(product) : null;
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      throw new Error('Erro interno do servidor ao buscar produto');
    }
  }

  async create(productData: CreateProductRequest): Promise<Product> {
    try {
      const product = new ProductModel({
        ...productData,
        isActive: true
      });

      const savedProduct = await product.save();
      return this.mapToProduct(savedProduct);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      if (error instanceof Error && error.name === 'ValidationError') {
        throw new Error('Dados do produto inválidos');
      }
      throw new Error('Erro interno do servidor ao criar produto');
    }
  }

  async update(id: string, productData: UpdateProductRequest): Promise<Product | null> {
    try {
      if (!this.isValidObjectId(id)) {
        return null;
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { ...productData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      return updatedProduct ? this.mapToProduct(updatedProduct) : null;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      if (error instanceof Error && error.name === 'ValidationError') {
        throw new Error('Dados do produto inválidos');
      }
      throw new Error('Erro interno do servidor ao atualizar produto');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      if (!this.isValidObjectId(id)) {
        return false;
      }

      const result = await ProductModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw new Error('Erro interno do servidor ao deletar produto');
    }
  }

  async findByCategory(category: string): Promise<Product[]> {
    try {
      const products = await ProductModel.find({ 
        category: { $regex: category, $options: 'i' } 
      }).sort({ createdAt: -1 });
      
      return products.map(this.mapToProduct);
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      throw new Error('Erro interno do servidor ao buscar produtos por categoria');
    }
  }

  async findActiveProducts(): Promise<Product[]> {
    try {
      const products = await ProductModel.find({ isActive: true }).sort({ createdAt: -1 });
      return products.map(this.mapToProduct);
    } catch (error) {
      console.error('Erro ao buscar produtos ativos:', error);
      throw new Error('Erro interno do servidor ao buscar produtos ativos');
    }
  }

  private mapToProduct(productDoc: any): Product {
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

  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}