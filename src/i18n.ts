import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import ptBRTranslations from './locales/pt-BR.json';

const resources = {
    en: {
        translation: enTranslations,
    },
    'pt-BR': {
        translation: ptBRTranslations,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('tmdb-language') || 'pt-BR',
        fallbackLng: 'pt-BR',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
