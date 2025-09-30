import mongoose, { Document } from 'mongoose';
import { Product } from '../../../domain/entities/Product';
export interface ProductDocument extends Omit<Product, 'id'>, Document {
    id: string;
}
export declare const ProductModel: mongoose.Model<ProductDocument, {}, {}, {}, mongoose.Document<unknown, {}, ProductDocument, {}, {}> & ProductDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=ProductSchema.d.ts.map