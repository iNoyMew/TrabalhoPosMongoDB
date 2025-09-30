"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseConnection {
    constructor() {
        this.isConnected = false;
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    async connect() {
        if (this.isConnected) {
            console.log('MongoDB já está conectado');
            return;
        }
        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/trabalho-mongodb';
            await mongoose_1.default.connect(mongoUri);
            this.isConnected = true;
            console.log('✅ MongoDB conectado com sucesso');
            mongoose_1.default.connection.on('error', (error) => {
                console.error('❌ Erro na conexão com MongoDB:', error);
                this.isConnected = false;
            });
            mongoose_1.default.connection.on('disconnected', () => {
                console.log('⚠️ MongoDB desconectado');
                this.isConnected = false;
            });
            mongoose_1.default.connection.on('reconnected', () => {
                console.log('🔄 MongoDB reconectado');
                this.isConnected = true;
            });
        }
        catch (error) {
            console.error('❌ Erro ao conectar com MongoDB:', error);
            throw error;
        }
    }
    async disconnect() {
        if (!this.isConnected) {
            return;
        }
        try {
            await mongoose_1.default.disconnect();
            this.isConnected = false;
            console.log('✅ MongoDB desconectado com sucesso');
        }
        catch (error) {
            console.error('❌ Erro ao desconectar do MongoDB:', error);
            throw error;
        }
    }
    getConnectionStatus() {
        return this.isConnected;
    }
}
exports.default = DatabaseConnection;
//# sourceMappingURL=connection.js.map