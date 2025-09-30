"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types");
const ProductRepository_1 = require("../repositories/ProductRepository");
const ProductService_1 = require("../../aplicacao/services/ProductService");
const ProductController_1 = require("../../apresentacao/controllers/ProductController");
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.ProductRepository).to(ProductRepository_1.ProductRepository);
container.bind(types_1.TYPES.ProductService).to(ProductService_1.ProductService);
container.bind(types_1.TYPES.ProductController).to(ProductController_1.ProductController);
//# sourceMappingURL=container.js.map