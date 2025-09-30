# API REST com TypeScript e MongoDB

Esta é uma API REST desenvolvida com TypeScript e MongoDB seguindo os princípios de arquitetura em camadas e inversão de controle.

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas bem definida:

### 📁 Estrutura do Projeto

```
src/
├── domain/                    # Camada de Domínio
│   ├── entities/             # Entidades de negócio
│   ├── repositories/         # Interfaces dos repositórios
│   └── services/             # Interfaces dos serviços
├── application/              # Camada de Aplicação
│   └── services/             # Implementação dos serviços
├── infrastructure/           # Camada de Infraestrutura
│   ├── database/            # Configuração do banco
│   ├── repositories/        # Implementação dos repositórios
│   └── container/           # Inversão de controle
└── presentation/            # Camada de Apresentação
    ├── controllers/         # Controladores REST
    └── routes/              # Definição das rotas
```

## 🚀 Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Inversify** - Container de injeção de dependência
- **Helmet** - Middleware de segurança
- **CORS** - Middleware para CORS

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB (versão 4.4 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
PORT=3000
MONGODB_URI=mongodb://localhost:27017/trabalho-mongodb
NODE_ENV=development
```

4. Compile o TypeScript:
```bash
npm run build
```

5. Inicie o servidor:
```bash
npm start
```

Para desenvolvimento com hot reload:
```bash
npm run dev
```

## 📚 Endpoints da API

### Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/products` | Lista todos os produtos |
| GET | `/api/products/active` | Lista produtos ativos |
| GET | `/api/products/category/:category` | Lista produtos por categoria |
| GET | `/api/products/:id` | Busca produto por ID |
| POST | `/api/products` | Cria novo produto |
| PUT | `/api/products/:id` | Atualiza produto |
| DELETE | `/api/products/:id` | Remove produto |

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Status da API |

## 📝 Exemplos de Uso

### Criar um produto

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone XYZ",
    "description": "Smartphone com tela de 6.1 polegadas",
    "price": 1299.99,
    "category": "Eletrônicos",
    "stock": 50
  }'
```

### Buscar todos os produtos

```bash
curl http://localhost:3000/api/products
```

### Atualizar um produto

```bash
curl -X PUT http://localhost:3000/api/products/ID_DO_PRODUTO \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199.99,
    "stock": 45
  }'
```

### Deletar um produto

```bash
curl -X DELETE http://localhost:3000/api/products/ID_DO_PRODUTO
```

## 🏛️ Princípios Arquiteturais Implementados

### 1. Inversão de Controle
- Uso do Inversify para injeção de dependência
- Interfaces definidas no domínio, implementações na infraestrutura

### 2. Separação de Responsabilidades
- **Domain**: Entidades e regras de negócio
- **Application**: Casos de uso e serviços
- **Infrastructure**: Acesso a dados e integrações externas
- **Presentation**: Controllers e rotas

### 3. Isolamento de Camadas
- Cada camada tem responsabilidades específicas
- Dependências apontam para dentro (camadas internas)
- Interfaces definem contratos entre camadas

### 4. Modelagem NoSQL
- Schemas Mongoose com validações
- Índices para performance
- Documentos representando entidades de negócio

## 🔧 Funcionalidades Implementadas

- ✅ CRUD completo de produtos
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Logs estruturados
- ✅ Middleware de segurança
- ✅ Conexão com MongoDB
- ✅ Injeção de dependência
- ✅ Arquitetura em camadas

## 🧪 Testando a API

Você pode usar ferramentas como:
- **Postman**
- **Insomnia**
- **curl** (linha de comando)
- **Thunder Client** (VS Code)

## 📊 Estrutura do Banco de Dados

### Coleção: products

```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String", 
  "price": "Number",
  "category": "String",
  "stock": "Number",
  "isActive": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 🚨 Tratamento de Erros

A API retorna respostas padronizadas:

```json
{
  "success": true/false,
  "message": "Mensagem descritiva",
  "data": {}, // quando aplicável
  "error": "Detalhes do erro" // apenas em desenvolvimento
}
```

## 📈 Próximos Passos

- [ ] Implementar autenticação/autorização
- [ ] Adicionar paginação
- [ ] Implementar cache
- [ ] Adicionar testes unitários
- [ ] Implementar logs estruturados
- [ ] Adicionar documentação Swagger




