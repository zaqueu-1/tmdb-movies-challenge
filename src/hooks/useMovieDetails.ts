import { useState, useEffect } from 'react';
import type { MovieDetails } from '../types';
import { tmdbApi } from '../services/api';

interface UseMovieDetailsReturn {
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

export function useMovieDetails(movieId: number | null): UseMovieDetailsReturn {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      setLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      setMovie(null);

      try {
        const data = await tmdbApi.getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : null;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movie, loading, error };
}


