import { useState, useCallback, type ReactNode } from 'react';
import type { Movie, ApiResponse } from '../types';
import { tmdbApi } from '../services/api';
import { MoviesContext } from './MoviesContext';

interface MoviesProviderProps {
    children: ReactNode;
}

export function MoviesProvider({ children }: MoviesProviderProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const handleApiCall = useCallback(
        async (apiCall: () => Promise<ApiResponse<Movie>>, append = false) => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiCall();

                if (append) {
                    setMovies((prevMovies) => [...prevMovies, ...response.results]);
                } else {
                    setMovies(response.results);
                }

                setTotalPages(response.totalPages);
                setCurrentPage(response.page);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar filmes';
                setError(errorMessage);
                if (!append) {
                    setMovies([]);
                }
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const fetchPopularMovies = useCallback(
        async (page = 1, append = false) => {
            await handleApiCall(() => tmdbApi.getPopularMovies(page), append);
        },
        [handleApiCall]
    );

    const clearMovies = useCallback(() => {
        setMovies([]);
        setError(null);
        setTotalPages(0);
        setCurrentPage(1);
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                movies,
                loading,
                error,
                totalPages,
                currentPage,
                fetchPopularMovies,
                clearMovies,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
}

