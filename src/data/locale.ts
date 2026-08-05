export type Locale = "fr" | "en";

export type LocalizedString = Record<Locale, string>;

export function pickLocale(locale: Locale, value: LocalizedString): string {
  return value[locale] ?? value.fr;
}
