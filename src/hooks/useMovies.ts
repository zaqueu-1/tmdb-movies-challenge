import { useContext } from 'react';
import { MoviesContext, type MoviesContextData } from '../contexts';

export function useMovies(): MoviesContextData {
  const context = useContext(MoviesContext);
  
  if (context === undefined) {
    throw new Error('useMovies deve ser usado dentro de um MoviesProvider');
  }
  
  return context;
}

