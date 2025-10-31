import { createContext } from 'react';
import type { Movie } from '../types';

export interface FavoritesContextData {
  favorites: Movie[];
  addFavorite: (movie: Movie, showToast?: boolean) => void;
  removeFavorite: (movieId: number, showToast?: boolean) => void;
  isFavorite: (movieId: number) => boolean;
  toggleFavorite: (movie: Movie) => void;
}

export const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);


