import * as Localization from "expo-localization";

import i18n from "i18n-js";

import en from "./languages/en.json";
import vi from "./languages/vi.json";

// Set the key-value pairs for the different languages you want to support.
const translations = { en, vi };
i18n.translations = translations;
// Set the locale once at the beginning of your app.
const locale = Localization.locale.search(/-|_/) !== -1 ? Localization.locale.slice(0, 2) : Localization.locale;
i18n.locale = locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default function translate(name: string, params = {}) {
    return i18n.t(name, params);
}
