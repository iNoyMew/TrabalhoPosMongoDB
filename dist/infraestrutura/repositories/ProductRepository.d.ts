import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../domain/entities/Product';
export declare class ProductRepository implements IProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    create(productData: CreateProductRequest): Promise<Product>;
    update(id: string, productData: UpdateProductRequest): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
    findByCategory(category: string): Promise<Product[]>;
    findActiveProducts(): Promise<Product[]>;
    private mapToProduct;
    private isValidObjectId;
}
//# sourceMappingURL=ProductRepository.d.ts.map