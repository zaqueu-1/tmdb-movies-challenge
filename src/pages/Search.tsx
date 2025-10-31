import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { tmdbApi } from '../services/api';
import type { Movie } from '../types';
import { MovieCard } from '../components/MovieCard';
import { MovieCardSkeleton } from '../components/ui/Skeleton';
import { ErrorMessage } from '../components/ErrorMessage';

export function Search() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const isLoadingRef = useRef(false);

    useEffect(() => {
        setPage(1);
        setMovies([]);
        setError(null);
    }, [query]);

    useEffect(() => {
        if (!query.trim()) {
            setMovies([]);
            return;
        }

        const searchMovies = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await tmdbApi.searchMovies(query, page);

                if (page === 1) {
                    setMovies(response.results);
                } else {
                    setMovies((prev) => [...prev, ...response.results]);
                }

                setTotalPages(response.totalPages);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : t('errors.generic');
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        searchMovies();
    }, [query, page, t]);

    const handleLoadMore = useCallback(() => {
        if (isLoadingRef.current || loading) {
            return;
        }

        if (page >= totalPages) {
            return;
        }

        isLoadingRef.current = true;
        setIsLoadingMore(true);
        setPage((prev) => prev + 1);
    }, [loading, page, totalPages]);

    useEffect(() => {
        if (isLoadingMore && !loading) {
            requestAnimationFrame(() => {
                const timer = setTimeout(() => {
                    isLoadingRef.current = false;
                    setIsLoadingMore(false);
                }, 600);

                return () => clearTimeout(timer);
            });
        }
    }, [loading, isLoadingMore]);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        if (page >= totalPages || !query.trim()) {
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
    }, [page, totalPages, loading, handleLoadMore, query]);


    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h2 className="text-2xl md:text-3xl font-medium">
                    {t('search.title')} <span className="text-primary">"{query}"</span>
                </h2>
            </motion.div>

            {!query && (
                <div className="text-center py-16">
                    <svg
                        className="w-24 h-24 mx-auto text-muted-foreground mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <p className="text-xl text-muted-foreground">
                        {t('common.searchPlaceholder')}
                    </p>
                </div>
            )}

            {error && !loading && (
                <ErrorMessage
                    message={error}
                    onRetry={() => setPage(1)}
                />
            )}

            {query && !error && (
                <>
                    {(movies.length > 0 || loading) && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                            {movies.map((movie, index) => (
                                <MovieCard key={movie.id} movie={movie} index={index} searchTerm={query} />
                            ))}

                            {isLoadingMore && Array.from({ length: 18 }).map((_, i) => (
                                <MovieCardSkeleton key={`skeleton-${i}`} />
                            ))}
                        </div>
                    )}

                    {loading && page === 1 && movies.length === 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                            {Array.from({ length: 18 }).map((_, i) => (
                                <MovieCardSkeleton key={`initial-skeleton-${i}`} />
                            ))}
                        </div>
                    )}

                    {movies.length > 0 && page < totalPages && (
                        <div ref={loadMoreRef} className="h-10" />
                    )}

                    {!loading && movies.length === 0 && query && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16 space-y-4"
                        >
                            <div className="w-32 h-32 rounded-full glass flex items-center justify-center mx-auto">
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
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">
                                    {t('search.noResults', { query })}
                                </h2>
                                <p className="text-muted-foreground">
                                    {t('search.tryAgain')}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {!loading && !isLoadingMore && movies.length > 0 && page >= totalPages && (
                        <p className="text-center text-muted-foreground py-8">
                            {t('common.allMoviesLoaded')}
                        </p>
                    )}
                </>
            )}
        </div>
    );
}

