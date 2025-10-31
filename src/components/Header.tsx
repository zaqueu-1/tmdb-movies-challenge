import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../hooks/useDebounce';
import { SettingsDropdown } from './SettingsDropdown';
import { cn } from '../utils/cn';

export function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get('q') || '';
    const [searchValue, setSearchValue] = useState(queryParam);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const debouncedSearch = useDebounce(searchValue, 500);
    const isSearching = searchValue !== debouncedSearch && searchValue.trim().length > 0;

    const isHomePage = location.pathname === '/';
    const isFavoritesPage = location.pathname === '/favorites';

    useEffect(() => {
        setSearchValue(queryParam);
    }, [queryParam]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (debouncedSearch.trim()) {
            navigate(`/search?q=${encodeURIComponent(debouncedSearch)}`);
            setMobileSearchOpen(false);
        }
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 w-full bg-[#2c3e50] shadow-md"
        >
            <div className="w-full px-6">
                <div className="hidden md:flex items-center justify-between gap-6 h-16">
                    <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                        <div className="w-7 h-7 rounded bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                            <svg
                                className="w-4 h-4 text-white"
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
                        </div>
                        <span className="text-base font-bold text-white">
                            MovieDB
                        </span>
                    </Link>

                    <form onSubmit={handleSearch} className="flex-1 max-w-3xl">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder={t('common.searchPlaceholder')}
                                className={cn(
                                    'w-full h-9 px-4 rounded',
                                    'bg-[#34495e] border-none',
                                    'text-slate-100 placeholder:text-slate-400 text-sm',
                                    'focus:outline-none focus:ring-1 focus:ring-blue-400/50',
                                    'transition-all duration-200',
                                    isSearching && 'pr-10'
                                )}
                            />
                            {isSearching && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <svg
                                        className="w-4 h-4 text-slate-400 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </form>

                    <nav className="flex items-center gap-2 shrink-0">
                        <Link
                            to="/"
                            className={cn(
                                'px-6 py-1.5 rounded font-medium transition-all duration-200 text-sm',
                                isHomePage
                                    ? 'bg-[#5dade2] text-white'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                            )}
                        >
                            {t('nav.home')}
                        </Link>
                        <Link
                            to="/favorites"
                            className={cn(
                                'px-6 py-1.5 rounded font-medium transition-all duration-200 text-sm',
                                isFavoritesPage
                                    ? 'bg-[#5dade2] text-white'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                            )}
                        >
                            {t('nav.favorites')}
                        </Link>

                        <SettingsDropdown variant="desktop" />
                    </nav>
                </div>

                <div className="md:hidden">
                    <div className="flex items-center justify-between h-14">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
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
                            </div>
                            <span className="text-base font-bold text-white">
                                MovieDB
                            </span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                                className="p-2 rounded text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                                aria-label="Toggle search"
                            >
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
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>

                            <Link
                                to="/"
                                className={cn(
                                    'px-3 py-1.5 rounded text-xs font-medium transition-colors',
                                    isHomePage
                                        ? 'bg-[#5dade2] text-white'
                                        : 'text-slate-300 hover:bg-slate-700/50'
                                )}
                            >
                                {t('nav.home')}
                            </Link>
                            <Link
                                to="/favorites"
                                className={cn(
                                    'px-3 py-1.5 rounded text-xs font-medium transition-colors',
                                    isFavoritesPage
                                        ? 'bg-[#5dade2] text-white'
                                        : 'text-slate-300 hover:bg-slate-700/50'
                                )}
                            >
                                {t('nav.favorites')}
                            </Link>

                            <SettingsDropdown variant="mobile" />
                        </div>
                    </div>

                    {mobileSearchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pb-3"
                        >
                            <form onSubmit={handleSearch}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        placeholder={t('common.searchPlaceholder')}
                                        className={cn(
                                            'w-full h-9 px-4 rounded bg-[#34495e] border-none text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400/50 transition-all',
                                            isSearching && 'pr-10'
                                        )}
                                        autoFocus
                                    />
                                    {isSearching && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <svg
                                                className="w-4 h-4 text-slate-400 animate-spin"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.header>
    );
}

