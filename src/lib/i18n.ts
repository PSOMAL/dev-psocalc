import sv from "@/locales/sv.json";
import en from "@/locales/en.json";
import nl from "@/locales/nl.json";
import type { TranslationData } from "@/types";

const translations: Record<string, TranslationData> = { sv, en, nl };

export const getTranslation = (locale: string): TranslationData => {
  return translations[locale] || translations["sv"];
};
