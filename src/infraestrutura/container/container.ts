import { Container } from 'inversify';
import { TYPES } from './types';

import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductRepository } from '../repositories/ProductRepository';

import { IProductService } from '../../domain/services/IProductService';
import { ProductService } from '../../aplicacao/services/ProductService';

import { ProductController } from '../../apresentacao/controllers/ProductController';

const container = new Container();

container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);

container.bind<IProductService>(TYPES.ProductService).to(ProductService);

container.bind<ProductController>(TYPES.ProductController).to(ProductController);

export { container };