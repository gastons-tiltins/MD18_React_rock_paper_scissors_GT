import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    gameTitle: 'Rock Paper Scissors (best of 5)',
                    description: {
                        part1: 'This is English',
                        part2: 'Learn React',
                    },
                },
            },
            lv: {
                translation: {
                    gameTitle: 'Akmens Šķēres Papīrīts (labākais no 5)',
                    description: {
                        part1: 'This is german.',
                        part2: 'Lerne React',
                    },
                },
            },
        },
    });

export default i18n;
