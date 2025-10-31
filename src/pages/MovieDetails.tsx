import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useFavorites } from '../hooks/useFavorites';
import { LazyImage } from '../components/LazyImage';
import { ErrorMessage } from '../components/ErrorMessage';
import { Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { getBackdropUrl, PLACEHOLDER_IMAGE } from '../utils/image';
import { formatDate, formatRating } from '../utils/format';

export function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const movieId = id ? parseInt(id) : null;
    const { movie, loading, error } = useMovieDetails(movieId);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-[400px] w-full rounded-2xl" />
                <div className="space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <ErrorMessage
                message={error || t('errors.movieNotFound')}
                onRetry={() => window.location.reload()}
            />
        );
    }

    const backdropUrl = getBackdropUrl(movie.backdropPath, 'original') || PLACEHOLDER_IMAGE;
    const isFav = isFavorite(movie.id);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <Link to="/">
                <Button variant="ghost" size="sm">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    {t('details.backToHome')}
                </Button>
            </Link>

            <div className="grid lg:grid-cols-[700px_1fr] gap-8 mt-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-full"
                >
                    <LazyImage
                        src={backdropUrl}
                        alt={movie.title}
                        fallback={PLACEHOLDER_IMAGE}
                        aspectRatio="16/9"
                        className="rounded-2xl shadow-2xl w-full"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            {movie.title}
                        </h1>
                    </div>

                    {movie.genres && movie.genres.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                                {t('movie.genres')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="glass px-3 py-1 rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {movie.releaseDate && (
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                                {t('movie.releaseDate')}
                            </h3>
                            <p className="text-base">{formatDate(movie.releaseDate)}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                            {t('movie.rating')}
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                                <svg
                                    className="w-5 h-5 text-yellow-400 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <span className="font-semibold text-lg">{formatRating(movie.rating)}</span>
                            </div>
                            <span className="text-muted-foreground">
                                ({movie.voteCount.toLocaleString()} {t('movie.votes')})
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                            {t('movie.overview')}
                        </h3>
                        <p className="text-base leading-relaxed">
                            {movie.overview || t('movie.noOverview')}
                        </p>
                    </div>

                    <Button
                        onClick={() => toggleFavorite(movie)}
                        size="lg"
                        variant={isFav ? 'destructive' : 'default'}
                        className="w-full md:w-auto"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill={isFav ? 'currentColor' : 'none'}
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
                        {isFav ? t('movie.removeFromFavorites') : t('movie.addToFavorites')}
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}
