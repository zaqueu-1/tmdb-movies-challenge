import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import type { Movie } from '../types';
import { FavoritesContext } from './FavoritesContext';

interface FavoritesProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'tmdb-favorites';

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const toastShownRef = useRef<{ action: string; id: number; timestamp: number } | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const showToastOnce = useCallback((action: 'add' | 'remove', movieId: number, message: string) => {
    const now = Date.now();
    const key = `${action}-${movieId}`;

    if (
      toastShownRef.current &&
      toastShownRef.current.action === key &&
      toastShownRef.current.id === movieId &&
      now - toastShownRef.current.timestamp < 1000
    ) {
      return;
    }

    if (action === 'remove') {
      toast.error(message);
    } else {
      toast.success(message);
    }

    toastShownRef.current = { action: key, id: movieId, timestamp: now };
  }, []);

  const addFavorite = useCallback((movie: Movie, showToast = false) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev;
      }
      if (showToast) {
        showToastOnce('add', movie.id, t('toast.addedToFavorites'));
      }
      return [...prev, movie];
    });
  }, [t, showToastOnce]);

  const removeFavorite = useCallback((movieId: number, showToast = false) => {
    setFavorites((prev) => {
      const filtered = prev.filter((fav) => fav.id !== movieId);
      if (filtered.length !== prev.length && showToast) {
        showToastOnce('remove', movieId, t('toast.removedFromFavorites'));
      }
      return filtered;
    });
  }, [t, showToastOnce]);

  const isFavorite = useCallback((movieId: number) => {
    return favorites.some((fav) => fav.id === movieId);
  }, [favorites]);

  const toggleFavorite = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === movie.id);

      if (exists) {
        showToastOnce('remove', movie.id, t('toast.removedFromFavorites'));
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        showToastOnce('add', movie.id, t('toast.addedToFavorites'));
        return [...prev, movie];
      }
    });
  }, [t, showToastOnce]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}


