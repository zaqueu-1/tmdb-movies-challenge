import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Movie } from '../types';
import { LazyImage } from './LazyImage';
import { getPosterUrl, PLACEHOLDER_IMAGE } from '../utils/image';
import { formatRating } from '../utils/format';
import { useFavorites } from '../hooks/useFavorites';

interface MovieCardProps {
    movie: Movie;
    index?: number;
    showRemove?: boolean;
    searchTerm?: string;
}

export function MovieCard({ movie, index = 0, showRemove = false, searchTerm }: MovieCardProps) {
    const posterUrl = getPosterUrl(movie.posterPath, 'w300') || PLACEHOLDER_IMAGE;
    const { isFavorite, toggleFavorite, removeFavorite } = useFavorites();
    const isFav = isFavorite(movie.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (showRemove) {
            removeFavorite(movie.id, true);
        } else {
            toggleFavorite(movie);
        }
    };

    const highlightTitle = (title: string, term?: string) => {
        if (!term || !term.trim()) return title;

        const regex = new RegExp(`(${term})`, 'gi');
        const parts = title.split(regex);

        return (
            <>
                {parts.map((part, i) =>
                    regex.test(part) ? (
                        <mark key={i} className="bg-primary/30 text-primary-foreground px-1 rounded">
                            {part}
                        </mark>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative"
        >
            <Link to={`/movie/${movie.id}`} className="block">
                <div className="glass-card overflow-hidden hover-lift group-hover:shadow-2xl group-hover:shadow-primary/20">
                    <div className="relative">
                        <LazyImage
                            src={posterUrl}
                            alt={movie.title}
                            fallback={PLACEHOLDER_IMAGE}
                            aspectRatio="2/3"
                            objectFit="cover"
                            className="rounded-t-2xl"
                        />

                        <div className="absolute top-3 right-3 glass px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <svg
                                className="w-4 h-4 text-yellow-400 fill-current"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="text-sm font-semibold">
                                {formatRating(movie.rating)}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleFavoriteClick}
                            className="absolute top-3 left-3 glass p-2 rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-smooth z-10"
                            aria-label={showRemove ? 'Remover dos favoritos' : isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                        >
                            {showRemove ? (
                                <svg
                                    className="w-5 h-5 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className={`w-5 h-5 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-white'
                                        }`}
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
                            )}
                        </button>

                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-4">
                            <p className="text-white text-sm line-clamp-3">
                                {movie.overview || 'Sem descrição disponível'}
                            </p>
                        </div>
                    </div>

                    <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-base line-clamp-2 overflow-hidden text-ellipsis group-hover:text-primary transition-smooth min-h-12">
                            {highlightTitle(movie.title, searchTerm)}
                        </h3>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}</span>
                            <span className="flex items-center gap-1">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                                {movie.voteCount.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
