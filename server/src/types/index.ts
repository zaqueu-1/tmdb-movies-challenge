export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult: boolean;
    genre_ids: number[];
}

export interface MovieDetails extends Movie {
    runtime: number;
    budget: number;
    revenue: number;
    status: string;
    tagline: string;
    genres: Genre[];
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
    english_name: string;
}

export interface TMDBApiResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface ApiError {
    status_code: number;
    status_message: string;
    success: boolean;
}

export interface SimplifiedMovie {
    id: number;
    title: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    releaseDate: string;
    rating: number;
    voteCount: number;
}

export interface SimplifiedMovieDetails extends SimplifiedMovie {
    runtime: number;
    tagline: string;
    genres: Genre[];
}

export interface ApiResponse<T> {
    page: number;
    results: T[];
    totalPages: number;
    totalResults: number;
}


