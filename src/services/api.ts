import type { ApiResponse, Movie, MovieDetails, ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiClientError extends Error {
    statusCode: number;
    apiError?: ApiError;

    constructor(
        message: string,
        statusCode: number,
        apiError?: ApiError
    ) {
        super(message);
        this.name = 'ApiClientError';
        this.statusCode = statusCode;
        this.apiError = apiError;
    }
}

async function fetchFromBFF<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorData: ApiError = await response.json().catch(() => ({
                success: false,
                message: response.statusText,
            }));

            throw new ApiClientError(
                errorData.message || 'Erro ao buscar dados',
                response.status,
                errorData
            );
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiClientError) {
            throw error;
        }
        throw new ApiClientError('Erro de conexão com o servidor', 0);
    }
}

export const tmdbApi = {
    getPopularMovies: async (page = 1): Promise<ApiResponse<Movie>> => {
        return fetchFromBFF<ApiResponse<Movie>>('/movies/popular', {
            page: page.toString(),
        });
    },

    getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
        return fetchFromBFF<MovieDetails>(`/movies/${movieId}`);
    },

    searchMovies: async (query: string, page = 1): Promise<ApiResponse<Movie>> => {
        return fetchFromBFF<ApiResponse<Movie>>('/movies/search', {
            q: query,
            page: page.toString(),
        });
    },
};

export { ApiClientError };
