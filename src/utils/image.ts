const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

export type ImageSize =
    | 'w92'
    | 'w154'
    | 'w185'
    | 'w300'
    | 'w342'
    | 'w500'
    | 'w780'
    | 'original';

export type BackdropSize =
    | 'w300'
    | 'w780'
    | 'w1280'
    | 'original';

export function getImageUrl(
    path: string | null,
    size: ImageSize | BackdropSize = 'w500'
): string | null {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getPosterUrl(
    posterPath: string | null,
    size: ImageSize = 'w500'
): string | null {
    return getImageUrl(posterPath, size);
}

export function getBackdropUrl(
    backdropPath: string | null,
    size: BackdropSize = 'w1280'
): string | null {
    return getImageUrl(backdropPath, size);
}

export const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"%3E%3Crect width="500" height="750" fill="%23cccccc"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23666666"%3ESem Imagem%3C/text%3E%3C/svg%3E';

