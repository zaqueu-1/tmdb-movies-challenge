import { createContext } from 'react';
import type { Movie } from '../types';

export interface MoviesContextData {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchPopularMovies: (page?: number, append?: boolean) => Promise<void>;
  clearMovies: () => void;
}

export const MoviesContext = createContext<MoviesContextData | undefined>(undefined);


