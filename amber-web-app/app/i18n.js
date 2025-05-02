import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      tr: {
        translation: {
            translatedText: 'Bu metin Türkçe olarak çevrildi.',
        }
        },
      en: {
        translation: {
          translatedText: 'This text is translated into English.',
        }
      }
    }
  });

export default i18n;