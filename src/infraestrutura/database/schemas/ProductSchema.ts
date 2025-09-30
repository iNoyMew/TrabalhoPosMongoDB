import mongoose, { Schema, Document } from 'mongoose';
import { Product } from '../../../domain/entities/Product';

export interface ProductDocument extends Omit<Product, 'id'>, Document {
  id: string;
}

const ProductSchema = new Schema<ProductDocument>({
  name: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Descrição do produto é obrigatória'],
    trim: true,
    maxlength: [500, 'Descrição não pode ter mais de 500 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'Preço do produto é obrigatório'],
    min: [0, 'Preço não pode ser negativo']
  },
  category: {
    type: String,
    required: [true, 'Categoria do produto é obrigatória'],
    trim: true,
    maxlength: [50, 'Categoria não pode ter mais de 50 caracteres']
  },
  stock: {
    type: Number,
    required: [true, 'Estoque do produto é obrigatório'],
    min: [0, 'Estoque não pode ser negativo'],
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

ProductSchema.index({ name: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ createdAt: -1 });

export const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);