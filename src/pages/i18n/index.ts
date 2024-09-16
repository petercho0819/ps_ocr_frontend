import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./sources/en";

const resources = {
  en: { ...enTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  debug: true,
});

export default i18n;
