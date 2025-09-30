import { injectable, inject } from 'inversify';
import { IProductService } from '../../domain/services/IProductService';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../domain/entities/Product';
import { TYPES } from '../../infraestrutura/container/types';

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.ProductRepository) private productRepository: IProductRepository
  ) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.findAll();
    } catch (error) {
      console.error('Erro no serviço ao buscar todos os produtos:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      if (!id || id.trim() === '') {
        throw new Error('ID do produto é obrigatório');
      }

      return await this.productRepository.findById(id);
    } catch (error) {
      console.error('Erro no serviço ao buscar produto por ID:', error);
      throw error;
    }
  }

  async createProduct(productData: CreateProductRequest): Promise<Product> {
    try {
      this.validateProductData(productData);

      const existingProducts = await this.productRepository.findAll();
      const duplicateProduct = existingProducts.find(
        p => p.name.toLowerCase() === productData.name.toLowerCase()
      );

      if (duplicateProduct) {
        throw new Error('Já existe um produto com este nome');
      }

      return await this.productRepository.create(productData);
    } catch (error) {
      console.error('Erro no serviço ao criar produto:', error);
      throw error;
    }
  }

  async updateProduct(id: string, productData: UpdateProductRequest): Promise<Product | null> {
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
        const duplicateProduct = allProducts.find(
          p => p.id !== id && p.name.toLowerCase() === productData.name!.toLowerCase()
        );

        if (duplicateProduct) {
          throw new Error('Já existe um produto com este nome');
        }
      }

      return await this.productRepository.update(id, productData);
    } catch (error) {
      console.error('Erro no serviço ao atualizar produto:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      if (!id || id.trim() === '') {
        throw new Error('ID do produto é obrigatório');
      }

      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        return false;
      }

      return await this.productRepository.delete(id);
    } catch (error) {
      console.error('Erro no serviço ao deletar produto:', error);
      throw error;
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      if (!category || category.trim() === '') {
        throw new Error('Categoria é obrigatória');
      }

      return await this.productRepository.findByCategory(category);
    } catch (error) {
      console.error('Erro no serviço ao buscar produtos por categoria:', error);
      throw error;
    }
  }

  async getActiveProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.findActiveProducts();
    } catch (error) {
      console.error('Erro no serviço ao buscar produtos ativos:', error);
      throw error;
    }
  }

  private validateProductData(productData: CreateProductRequest): void {
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
}