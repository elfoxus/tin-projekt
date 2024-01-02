import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import translationPL from './locales/pl.json';
import translationEN from './locales/en.json';
import dayjs from "dayjs";
import * as pl from 'dayjs/locale/pl';
import * as en from 'dayjs/locale/pl';

i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'pl',
        debug: true,
        resources: {
            pl: {
                translation: translationPL
            },
            en: {
                translation: translationEN
            }
        }
    });

// i18next.changeLanguage('en')
i18next.changeLanguage('pl')

export default i18next;