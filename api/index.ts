import type { VercelRequest, VercelResponse } from '@vercel/node';

process.env.TMDB_API_KEY = process.env.TMDB_API_KEY || '';
process.env.TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', TMDB_API_KEY);
    url.searchParams.append('language', 'pt-BR');

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.statusText}`);
    }

    return response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const url = new URL(req.url || '', `https://${req.headers.host}`);
    const pathname = url.pathname.replace('/api/', '');
    const pathParts = pathname.split('/').filter(Boolean);

    try {
        if (pathParts[0] === 'health') {
            return res.status(200).json({
                status: 'ok',
                message: 'BFF Server is running on Vercel'
            });
        }

        if (pathParts[0] === 'movies' && pathParts[1] === 'popular') {
            const page = (req.query.page as string) || '1';
            const data = await fetchFromTMDB('/movie/popular', { page });
            return res.status(200).json(data);
        }

        if (pathParts[0] === 'movies' && pathParts[1] === 'search') {
            const q = req.query.q as string;
            const page = (req.query.page as string) || '1';

            if (!q) {
                return res.status(400).json({
                    success: false,
                    message: 'Query parameter "q" is required'
                });
            }

            const data = await fetchFromTMDB('/search/movie', { query: q, page });
            return res.status(200).json(data);
        }

        if (pathParts[0] === 'movies' && pathParts[1] && pathParts[1] !== 'popular' && pathParts[1] !== 'search') {
            const movieId = pathParts[1];
            const data = await fetchFromTMDB(`/movie/${movieId}`);
            return res.status(200).json(data);
        }

        return res.status(404).json({
            success: false,
            message: 'Route not found',
            debug: { pathname, pathParts }
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal server error'
        });
    }
}

