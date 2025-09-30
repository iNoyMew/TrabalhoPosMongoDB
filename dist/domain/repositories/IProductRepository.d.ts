import { Product, CreateProductRequest, UpdateProductRequest } from '../entities/Product';
export interface IProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    create(productData: CreateProductRequest): Promise<Product>;
    update(id: string, productData: UpdateProductRequest): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
    findByCategory(category: string): Promise<Product[]>;
    findActiveProducts(): Promise<Product[]>;
}
//# sourceMappingURL=IProductRepository.d.ts.map