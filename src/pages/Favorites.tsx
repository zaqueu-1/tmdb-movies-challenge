import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { MovieCard } from '../components/MovieCard';
import { Button } from '../components/ui/Button';

type SortOption = 'titleAsc' | 'titleDesc' | 'ratingDesc' | 'ratingAsc' | 'dateDesc' | 'dateAsc';

export function Favorites() {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const [sortBy, setSortBy] = useState<SortOption>('titleAsc');

  const sortedFavorites = useMemo(() => {
    const sorted = [...favorites];

    switch (sortBy) {
      case 'titleAsc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'titleDesc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'ratingDesc':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'ratingAsc':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'dateDesc':
        return sorted.sort((a, b) => 
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      case 'dateAsc':
        return sorted.sort((a, b) => 
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
      default:
        return sorted;
    }
  }, [favorites, sortBy]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('favorites.title')}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {t('favorites.subtitle')}
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm font-medium">
              {t('favorites.sortBy')}:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="glass px-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
            >
              <option value="titleAsc">{t('favorites.sortOptions.titleAsc')}</option>
              <option value="titleDesc">{t('favorites.sortOptions.titleDesc')}</option>
              <option value="ratingDesc">{t('favorites.sortOptions.ratingDesc')}</option>
              <option value="ratingAsc">{t('favorites.sortOptions.ratingAsc')}</option>
              <option value="dateDesc">{t('favorites.sortOptions.dateDesc')}</option>
              <option value="dateAsc">{t('favorites.sortOptions.dateAsc')}</option>
            </select>
          </div>
        )}
      </motion.div>

      {favorites.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 space-y-6"
        >
          <div className="w-32 h-32 rounded-full glass flex items-center justify-center">
            <svg
              className="w-16 h-16 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">{t('favorites.empty')}</h2>
            <p className="text-muted-foreground">{t('favorites.emptyDescription')}</p>
          </div>
          <Link to="/">
            <Button size="lg">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              {t('nav.home')}
            </Button>
          </Link>
        </motion.div>
      )}

      {favorites.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {sortedFavorites.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} showRemove />
          ))}
        </div>
      )}
    </div>
  );
}

