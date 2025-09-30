import { Request, Response } from 'express';
import { IProductService } from '../../domain/services/IProductService';
export declare class ProductController {
    private productService;
    constructor(productService: IProductService);
    getAllProducts(req: Request, res: Response): Promise<void>;
    getProductById(req: Request, res: Response): Promise<void>;
    createProduct(req: Request, res: Response): Promise<void>;
    updateProduct(req: Request, res: Response): Promise<void>;
    deleteProduct(req: Request, res: Response): Promise<void>;
    getProductsByCategory(req: Request, res: Response): Promise<void>;
    getActiveProducts(req: Request, res: Response): Promise<void>;
    private validateRequiredFields;
    private getErrorStatusCode;
    private handleError;
}
//# sourceMappingURL=ProductController.d.ts.map