import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";
import kz from "./locales/kz/translation.json";

import { ENVIRONMENT } from "@/constants/envs";

const isDevelopment = ENVIRONMENT === "development";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    debug: isDevelopment,
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      kz: { translation: kz },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
