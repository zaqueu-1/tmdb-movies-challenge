# TMDB Movies Challenge
Aplicação React para explorar, pesquisar e favoritar filmes usando a API do The Movie Database (TMDB) com arquitetura BFF (Backend for Frontend). Desenvolvida como solução para um desafio técnico.

## 🚀 Tecnologias

### Frontend
- **React 18+** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server ultra-rápido
- **React Router** - Navegação entre páginas
- **Context API** - Gerenciamento de estado global (Movies, Favorites, Theme)
- **Fetch API** - Requisições HTTP nativas
- **Tailwind CSS v4** - Framework CSS utility-first
- **Framer Motion** - Animações e transições suaves
- **Radix UI** - Componentes acessíveis (Dialog, Dropdown, Switch)
- **i18next** - Internacionalização completa (PT-BR/EN)
- **Sonner** - Sistema de notificações toast elegante 

### Backend (BFF)
- **Node.js 20+** - Runtime JavaScript
- **Express 5** - Framework web minimalista
- **TypeScript** - Tipagem estática no servidor
- **CORS** - Controle de acesso entre origens
- **dotenv** - Gerenciamento seguro de variáveis de ambiente

## 🏗️ Arquitetura

Este projeto utiliza uma arquitetura BFF (Backend for Frontend) para maior segurança:

```
Frontend (React) → BFF (Express) → TMDB API
```

**Benefícios:**
- ✅ API Key do TMDB fica protegida no servidor
- ✅ Transformação de dados antes de enviar ao front

## 📁 Estrutura do Projeto

```
├── src/                # Frontend React
│   ├── components/     # Componentes reutilizáveis
│   ├── contexts/       # Context API para estado global
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Páginas da aplicação
│   ├── services/       # Cliente da API (chama o BFF)
│   ├── types/          # Definições de tipos TypeScript
│   ├── utils/          # Funções utilitárias
│
└── server/             # Backend BFF
    └── src/
        ├── config/     # Configurações (variáveis de ambiente)
        ├── routes/     # Rotas da API
        ├── services/   # Serviços (chamadas à TMDB)
        ├── middleware/ # Middlewares Express
        └── types/      # Tipos TypeScript do servidor
```

## 🛠️ Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Executar frontend em modo de desenvolvimento
npm run dev

# Executar backend (BFF) em modo de desenvolvimento
npm run dev:server

# Executar frontend e backend simultaneamente (recomendado)
npm run dev:all

# Build do frontend para produção
npm run build

# Build do backend para produção
npm run build:server

# Iniciar servidor de produção
npm run start:server

# Preview do build de produção (frontend)
npm run preview

# Executar linter
npm run lint
```

## 🚦 Como Executar

### Configuração Inicial

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd tmdb-movies-challenge
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` e adicione sua API Key do TMDB:
   ```env
   TMDB_API_KEY=
   TMDB_BASE_URL=https://api.themoviedb.org/3
   PORT=3001
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

4. **Obtenha sua API Key do TMDB**
   
   Se você ainda não possui uma API Key:
   
   a. Acesse https://www.themoviedb.org/ e crie uma conta
   
   b. Vá para Settings → API: https://www.themoviedb.org/settings/api
   
   c. Clique em "Request an API Key"
   
   d. Escolha "Developer" e preencha o formulário
   
   e. Copie a **API Key (v3 auth)** e cole no arquivo `.env`

   ⚠️ **Importante**: Sem a API Key configurada, o servidor não irá iniciar!

### Desenvolvimento

**Opção 1: Executar tudo junto (recomendado)**
```bash
npm run dev:all
```

**Opção 2: Executar separadamente**

Terminal 1 - Backend:
```bash
npm run dev:server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### Acessar a Aplicação

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## 🐳 Docker

Este projeto usa **Dockerfiles multi-stage**, permitindo desenvolvimento e produção com os mesmos arquivos.

### Desenvolvimento com Docker

```bash
# Iniciar ambiente de desenvolvimento com hot reload
docker-compose -f docker-compose.dev.yml up

# Ou em modo detached (background)
docker-compose -f docker-compose.dev.yml up -d

# Ver logs em tempo real
docker-compose -f docker-compose.dev.yml logs -f

# Parar os containers
docker-compose -f docker-compose.dev.yml down
```

**Acesso em desenvolvimento:**
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

**Recursos de desenvolvimento:**
- ✅ Hot reload automático no frontend e backend
- ✅ Volumes montados para edição em tempo real
- ✅ Logs detalhados

### Produção com Docker

```bash
# Build e executar em produção
docker-compose up -d

# Ver logs
docker-compose logs -f

# Recriar containers (após mudanças)
docker-compose up -d --build

# Parar os containers
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

**Acesso em produção:**
- **Frontend**: http://localhost (servido via Nginx)
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

**Características de produção:**
- ✅ Build otimizado e minificado
- ✅ Nginx para servir frontend
- ✅ Imagens Docker otimizadas (multi-stage build)
- ✅ Apenas dependências de produção

### Comandos Úteis do Docker

```bash
# Ver containers rodando
docker ps

# Ver logs de um serviço específico
docker-compose logs -f web    # Frontend
docker-compose logs -f api    # Backend

# Entrar no container (debug)
docker exec -it tmdb-web sh
docker exec -it tmdb-api sh

# Rebuild forçado (limpa cache)
docker-compose build --no-cache

# Remover imagens antigas
docker image prune -a
```

## 📋 Endpoints da API (BFF)

### Filmes

- `GET /api/movies/popular?page=1` - Lista filmes populares
- `GET /api/movies/search?q=termo&page=1` - Busca filmes por termo
- `GET /api/movies/:id` - Detalhes de um filme específico

### Health Check

- `GET /health` - Verifica se o servidor está funcionando


## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.
