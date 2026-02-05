import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/router";
import { getTranslation } from "@/lib/i18n";
import type { TranslationContextType } from "@/types";

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [locale, setLocale] = useState("sv");

  useEffect(() => {
    if (!router.isReady) return;
    const queryLocale =
      typeof router.query.lang === "string" ? router.query.lang : null;
    const storedLocale =
      typeof window !== "undefined"
        ? window.localStorage.getItem("locale")
        : null;
    const nextLocale = queryLocale || storedLocale || "sv";

    if (nextLocale !== locale) {
      setLocale(nextLocale);
    }
  }, [router.isReady, router.query.lang, locale]);

  const t = getTranslation(locale);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", newLocale);
    }
    const query = { ...router.query, lang: newLocale };
    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  return (
    <TranslationContext.Provider value={{ t, locale, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
