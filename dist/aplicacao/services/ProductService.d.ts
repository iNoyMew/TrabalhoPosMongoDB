import { IProductService } from '../../domain/services/IProductService';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../domain/entities/Product';
export declare class ProductService implements IProductService {
    private productRepository;
    constructor(productRepository: IProductRepository);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(productData: CreateProductRequest): Promise<Product>;
    updateProduct(id: string, productData: UpdateProductRequest): Promise<Product | null>;
    deleteProduct(id: string): Promise<boolean>;
    getProductsByCategory(category: string): Promise<Product[]>;
    getActiveProducts(): Promise<Product[]>;
    private validateProductData;
}
//# sourceMappingURL=ProductService.d.ts.map