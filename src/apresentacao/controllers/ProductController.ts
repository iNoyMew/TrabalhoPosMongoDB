import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { IProductService } from '../../domain/services/IProductService';
import { TYPES } from '../../infraestrutura/container/types';
import { CreateProductRequest, UpdateProductRequest } from '../../domain/entities/Product';

@injectable()
export class ProductController {
  constructor(
    @inject(TYPES.ProductService) private productService: IProductService
  ) {}

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      
      res.status(200).json({
        success: true,
        data: products,
        message: 'Produtos recuperados com sucesso',
        count: products.length
      });
    } catch (error) {
      this.handleError(res, error, 'Erro ao buscar todos os produtos');
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
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
    } catch (error) {
      this.handleError(res, error, 'Erro ao buscar produto por ID');
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData: CreateProductRequest = req.body;

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
    } catch (error) {
      const statusCode = this.getErrorStatusCode(error);
      this.handleError(res, error, 'Erro ao criar produto', statusCode);
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const productData: UpdateProductRequest = req.body;

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
    } catch (error) {
      const statusCode = this.getErrorStatusCode(error);
      this.handleError(res, error, 'Erro ao atualizar produto', statusCode);
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
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
    } catch (error) {
      this.handleError(res, error, 'Erro ao deletar produto');
    }
  }

  async getProductsByCategory(req: Request, res: Response): Promise<void> {
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
    } catch (error) {
      this.handleError(res, error, 'Erro ao buscar produtos por categoria');
    }
  }

  async getActiveProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getActiveProducts();

      res.status(200).json({
        success: true,
        data: products,
        message: 'Produtos ativos recuperados com sucesso',
        count: products.length
      });
    } catch (error) {
      this.handleError(res, error, 'Erro ao buscar produtos ativos');
    }
  }

  private validateRequiredFields(productData: CreateProductRequest): boolean {
    return !!(
      productData.name &&
      productData.description &&
      productData.price !== undefined &&
      productData.category &&
      productData.stock !== undefined
    );
  }

  private getErrorStatusCode(error: unknown): number {
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

  private handleError(
    res: Response, 
    error: unknown, 
    message: string, 
    statusCode: number = 500
  ): void {
    console.error(`${message}:`, error);
    
    res.status(statusCode).json({
      success: false,
      message: error instanceof Error ? error.message : message,
      error: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.stack : 'Erro desconhecido') : 
        undefined
    });
  }
}