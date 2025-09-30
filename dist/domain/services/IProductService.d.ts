import { Product, CreateProductRequest, UpdateProductRequest } from '../entities/Product';
export interface IProductService {
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(productData: CreateProductRequest): Promise<Product>;
    updateProduct(id: string, productData: UpdateProductRequest): Promise<Product | null>;
    deleteProduct(id: string): Promise<boolean>;
    getProductsByCategory(category: string): Promise<Product[]>;
    getActiveProducts(): Promise<Product[]>;
}
//# sourceMappingURL=IProductService.d.ts.map