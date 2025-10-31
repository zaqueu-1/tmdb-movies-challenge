import { useEffect, useRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard';
import { MovieCardSkeleton } from '../components/ui/Skeleton';
import { ErrorMessage } from '../components/ErrorMessage';

export function Home() {
  const { t } = useTranslation();
  const { movies, loading, error, fetchPopularMovies, currentPage, totalPages } = useMovies();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetchPopularMovies(1, false);
  }, [fetchPopularMovies]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingRef.current || loading) {
      return;
    }

    if (currentPage >= totalPages) {
      return;
    }

    isLoadingRef.current = true;
    setIsLoadingMore(true);
    const startTime = Date.now();

    fetchPopularMovies(currentPage + 1, true).finally(() => {
      requestAnimationFrame(() => {
        const elapsed = Date.now() - startTime;
        const minDelay = 600;
        const remainingDelay = Math.max(0, minDelay - elapsed);

        setTimeout(() => {
          isLoadingRef.current = false;
          setIsLoadingMore(false);
        }, remainingDelay);
      });
    });
  }, [loading, currentPage, totalPages, fetchPopularMovies]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (currentPage >= totalPages) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoadingRef.current && !loading) {
          handleLoadMore();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentPage, totalPages, loading, handleLoadMore]);

  return (
    <div className="space-y-8">
      {error && !loading && (
        <ErrorMessage
          message={error}
          onRetry={() => fetchPopularMovies(1, false)}
        />
      )}

      {!error && (
        <>
          {(movies.length > 0 || loading) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {movies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}

              {isLoadingMore && Array.from({ length: 18 }).map((_, i) => (
                <MovieCardSkeleton key={`skeleton-${i}`} />
              ))}
            </div>
          )}

          {loading && currentPage === 1 && movies.length === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {Array.from({ length: 18 }).map((_, i) => (
                <MovieCardSkeleton key={`initial-skeleton-${i}`} />
              ))}
            </div>
          )}

          {movies.length > 0 && currentPage < totalPages && (
            <div ref={loadMoreRef} className="h-10" />
          )}

          {!loading && !isLoadingMore && movies.length > 0 && currentPage >= totalPages && (
            <p className="text-center text-muted-foreground py-8">
              {t('common.allMoviesLoaded')}
            </p>
          )}
        </>
      )}

      {!loading && !error && movies.length === 0 && currentPage > 1 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">{t('common.noResults')}</p>
        </div>
      )}
    </div>
  );
}