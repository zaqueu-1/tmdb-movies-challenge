// IMPORTANTE: Importar config/env PRIMEIRO para garantir que dotenv seja carregado
import { env, validateEnv } from './config/env.js';
import express from 'express';
import cors from 'cors';
import moviesRoutes from './routes/movies.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Valida as variáveis de ambiente antes de iniciar
validateEnv();

const app = express();
const PORT = parseInt(env.PORT, 10);

app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', message: 'BFF Server is running' });
});
app.use('/api/movies', moviesRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`\n🚀 BFF Server rodando na porta ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📍 API: http://localhost:${PORT}/api/movies`);
    console.log(`✅ TMDB API Key configurada`);
    console.log(`✅ TMDB Base URL: ${env.TMDB_BASE_URL}\n`);
});

