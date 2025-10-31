import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

interface SettingsDropdownProps {
    variant?: 'desktop' | 'mobile';
}

export function SettingsDropdown({ variant = 'desktop' }: SettingsDropdownProps) {
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen && variant === 'desktop') {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, variant]);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsOpen(false);
    };

    const changeTheme = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
    };

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    if (variant === 'desktop') {
        return (
            <div ref={settingsRef} className="relative">
                <button
                    onClick={toggleSettings}
                    className="p-2 rounded text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors cursor-pointer"
                    aria-label="Configurações"
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
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50"
                        >
                            <div className="px-4 py-3 border-b border-slate-700">
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                                    {t('theme.toggle')}
                                </p>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => changeTheme('light')}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
                                            theme === 'light'
                                                ? 'bg-[#5dade2] text-white'
                                                : 'text-slate-300 hover:bg-slate-700/50'
                                        )}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        {t('theme.light')}
                                    </button>
                                    <button
                                        onClick={() => changeTheme('dark')}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
                                            theme === 'dark'
                                                ? 'bg-[#5dade2] text-white'
                                                : 'text-slate-300 hover:bg-slate-700/50'
                                        )}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                        {t('theme.dark')}
                                    </button>
                                </div>
                            </div>

                            <div className="px-4 py-3">
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                                    {t('language.select')}
                                </p>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => changeLanguage('pt-BR')}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
                                            i18n.language === 'pt-BR'
                                                ? 'bg-[#5dade2] text-white'
                                                : 'text-slate-300 hover:bg-slate-700/50'
                                        )}
                                    >
                                        <span className="text-lg">🇧🇷</span>
                                        {t('language.pt')}
                                    </button>
                                    <button
                                        onClick={() => changeLanguage('en')}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
                                            i18n.language === 'en'
                                                ? 'bg-[#5dade2] text-white'
                                                : 'text-slate-300 hover:bg-slate-700/50'
                                        )}
                                    >
                                        <span className="text-lg">🇺🇸</span>
                                        {t('language.en')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={toggleSettings}
                className="p-2 rounded text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors cursor-pointer"
                aria-label="Configurações"
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full border-t border-slate-700 bg-[#2c3e50]"
                    >
                        <div className="px-4 py-3 border-b border-slate-700">
                            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                                {t('theme.toggle')}
                            </p>
                            <div className="space-y-1">
                                <button
                                    onClick={() => changeTheme('light')}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
                                        theme === 'light'
                                            ? 'bg-[#5dade2] text-white'
                                            : 'text-slate-300 hover:bg-slate-700/50'
                                    )}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    {t('theme.light')}
                                </button>
                                <button
                                    onClick={() => changeTheme('dark')}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
                                        theme === 'dark'
                                            ? 'bg-[#5dade2] text-white'
                                            : 'text-slate-300 hover:bg-slate-700/50'
                                    )}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                    {t('theme.dark')}
                                </button>
                            </div>
                        </div>

                        <div className="px-4 py-3 pb-4">
                            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                                {t('language.select')}
                            </p>
                            <div className="space-y-1">
                                <button
                                    onClick={() => changeLanguage('pt-BR')}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
                                        i18n.language === 'pt-BR'
                                            ? 'bg-[#5dade2] text-white'
                                            : 'text-slate-300 hover:bg-slate-700/50'
                                    )}
                                >
                                    <span className="text-lg">🇧🇷</span>
                                    {t('language.pt')}
                                </button>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
                                        i18n.language === 'en'
                                            ? 'bg-[#5dade2] text-white'
                                            : 'text-slate-300 hover:bg-slate-700/50'
                                    )}
                                >
                                    <span className="text-lg">🇺🇸</span>
                                    {t('language.en')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

