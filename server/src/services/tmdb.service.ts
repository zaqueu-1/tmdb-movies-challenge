import { env } from '../config/env.js';
import type {
    Movie,
    MovieDetails,
    TMDBApiResponse,
    ApiError,
    SimplifiedMovie,
    SimplifiedMovieDetails,
    ApiResponse,
} from '../types/index.js';

class TMDBServiceError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'TMDBServiceError';
        this.statusCode = statusCode;
    }
}

function simplifyMovie(movie: Movie): SimplifiedMovie {
    return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
    };
}

function simplifyMovieDetails(movie: MovieDetails): SimplifiedMovieDetails {
    return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        runtime: movie.runtime,
        tagline: movie.tagline,
        genres: movie.genres,
    };
}

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    if (!env.TMDB_API_KEY) {
        console.error('❌ TMDB_API_KEY não encontrada na configuração');
        throw new TMDBServiceError('TMDB API Key não configurada', 500);
    }

    const url = new URL(`${env.TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', env.TMDB_API_KEY);
    url.searchParams.append('language', 'pt-BR');

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            let errorData: ApiError;
            try {
                errorData = (await response.json()) as ApiError;
            } catch {
                errorData = {
                    status_code: response.status,
                    status_message: response.statusText,
                    success: false,
                };
            }

            throw new TMDBServiceError(
                errorData.status_message || 'Erro ao buscar dados da API TMDB',
                response.status
            );
        }

        return (await response.json()) as T;
    } catch (error) {
        if (error instanceof TMDBServiceError) {
            throw error;
        }
        throw new TMDBServiceError('Erro de conexão com a API TMDB', 500);
    }
}

export const tmdbService = {
    async getPopularMovies(page = 1): Promise<ApiResponse<SimplifiedMovie>> {
        const response = await fetchFromTMDB<TMDBApiResponse<Movie>>('/movie/popular', {
            page: page.toString(),
        });

        return {
            page: response.page,
            results: response.results.map(simplifyMovie),
            totalPages: response.total_pages,
            totalResults: response.total_results,
        };
    },

    async getMovieDetails(movieId: number): Promise<SimplifiedMovieDetails> {
        const response = await fetchFromTMDB<MovieDetails>(`/movie/${movieId}`);
        return simplifyMovieDetails(response);
    },

    async searchMovies(query: string, page = 1): Promise<ApiResponse<SimplifiedMovie>> {
        const response = await fetchFromTMDB<TMDBApiResponse<Movie>>('/search/movie', {
            query,
            page: page.toString(),
        });

        return {
            page: response.page,
            results: response.results.map(simplifyMovie),
            totalPages: response.total_pages,
            totalResults: response.total_results,
        };
    },
};

export { TMDBServiceError };

