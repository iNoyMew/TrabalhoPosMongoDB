export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}
export interface UpdateProductRequest {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
    isActive?: boolean;
}
//# sourceMappingURL=Product.d.ts.map