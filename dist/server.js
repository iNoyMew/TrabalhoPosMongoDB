"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./infraestrutura/database/connection"));
const routes_1 = __importDefault(require("./apresentacao/routes"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || '3000', 10);
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    initializeMiddlewares() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)({
            origin: process.env.NODE_ENV === 'production'
                ? ['https://yourdomain.com']
                : true,
            credentials: true
        }));
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
            next();
        });
    }
    initializeRoutes() {
        this.app.use('/api', routes_1.default);
        this.app.get('/', (req, res) => {
            res.json({
                success: true,
                message: 'API REST com TypeScript e MongoDB',
                version: '1.0.0',
                endpoints: {
                    products: '/api/products',
                    health: '/api/health'
                }
            });
        });
        this.app.use('*', (req, res) => {
            res.status(404).json({
                success: false,
                message: 'Rota não encontrada',
                path: req.originalUrl
            });
        });
        this.app.use((error, req, res, next) => {
            console.error('Erro não tratado:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
            });
        });
    }
    async start() {
        try {
            const dbConnection = connection_1.default.getInstance();
            await dbConnection.connect();
            this.app.listen(this.port, () => {
                console.log(`🚀 Servidor rodando na porta ${this.port}`);
                console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
                console.log(`🔗 URL: http://localhost:${this.port}`);
                console.log(`📋 API Docs: http://localhost:${this.port}/api/health`);
            });
            process.on('SIGINT', async () => {
                console.log('\n⚠️ Recebido SIGINT. Encerrando servidor...');
                await dbConnection.disconnect();
                process.exit(0);
            });
            process.on('SIGTERM', async () => {
                console.log('\n⚠️ Recebido SIGTERM. Encerrando servidor...');
                await dbConnection.disconnect();
                process.exit(0);
            });
        }
        catch (error) {
            console.error('❌ Erro ao iniciar servidor:', error);
            process.exit(1);
        }
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=server.js.map