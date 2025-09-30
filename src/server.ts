import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import DatabaseConnection from './infraestrutura/database/connection';
import routes from './apresentacao/routes';

dotenv.config();

class Server {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : true,
      credentials: true
    }));

    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    this.app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  private initializeRoutes(): void {
    this.app.use('/api', routes);

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

    this.app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Erro não tratado:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
      });
    });
  }

  public async start(): Promise<void> {
    try {
      const dbConnection = DatabaseConnection.getInstance();
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

    } catch (error) {
      console.error('❌ Erro ao iniciar servidor:', error);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();