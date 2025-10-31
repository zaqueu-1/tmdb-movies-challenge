/**
 * Configuração de variáveis de ambiente
 * Este arquivo deve ser importado PRIMEIRO em qualquer módulo que precise das variáveis
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Para ES Modules, precisamos calcular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega as variáveis de ambiente IMEDIATAMENTE
// O caminho deve apontar para a raiz do projeto (3 níveis acima: config -> src -> server -> raiz)
const envPath = resolve(__dirname, '../../../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('⚠️  Aviso: Erro ao carregar .env:', result.error.message);
    console.error('📍 Tentando caminho:', envPath);
} else {
    console.log('✅ Arquivo .env carregado com sucesso de:', envPath);
}

// Exporta as configurações
export const env = {
    // Server config
    PORT: process.env.PORT || '3001',
    NODE_ENV: process.env.NODE_ENV || 'development',

    // TMDB API config
    TMDB_API_KEY: process.env.TMDB_API_KEY || '',
    TMDB_BASE_URL: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
} as const;

// Validação das variáveis obrigatórias
export function validateEnv(): void {
    const requiredEnvVars: Array<keyof typeof env> = ['TMDB_API_KEY', 'TMDB_BASE_URL'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !env[envVar]);

    if (missingEnvVars.length > 0) {
        console.error('❌ Erro: Variáveis de ambiente obrigatórias não configuradas:');
        missingEnvVars.forEach(envVar => {
            console.error(`   - ${envVar}`);
        });
        console.error('\n📝 Por favor, crie um arquivo .env na raiz do projeto com as seguintes variáveis:');
        console.error('   TMDB_API_KEY=sua_chave_api_aqui');
        console.error('   TMDB_BASE_URL=https://api.themoviedb.org/3');
        console.error('\n📚 Obtenha sua API Key em: https://www.themoviedb.org/settings/api\n');
        process.exit(1);
    }
}

// Log de confirmação (apenas em desenvolvimento)
if (env.NODE_ENV === 'development') {
    console.log('✅ Variáveis de ambiente carregadas');
    console.log(`📍 TMDB_BASE_URL: ${env.TMDB_BASE_URL}`);
    console.log(`📍 TMDB_API_KEY: ${env.TMDB_API_KEY ? env.TMDB_API_KEY.substring(0, 8) + '...' : '❌ NÃO CONFIGURADA'}`);
}

