export interface Movie {
    id: number;
    title: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    releaseDate: string;
    rating: number;
    voteCount: number;
}

export interface MovieDetails extends Movie {
    runtime: number;
    tagline: string;
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface ApiResponse<T> {
    page: number;
    results: T[];
    totalPages: number;
    totalResults: number;
}

export interface ApiError {
    success: false;
    message: string;
}
