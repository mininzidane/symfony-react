import BootstrapService from 'frontend/js/api/BootstrapService';
import CountryService from 'frontend/js/api/CountryService';

const defaultLocale = 'en';

const labels = {
  en: 'English',
  es: 'Español',
  pl: 'Polski',
  ru: 'Русский',
  ka: 'ქართული',
  de: 'Deutsche',
  ar: 'العربية',
  sq: 'Shqip',
  bg: 'Български',
  ro: 'Română',
  ko: '한국어',
  it: 'Italiano',
  uk: 'Українська',
};

const allLanguages = BootstrapService.getAppValue('countryLocales', {});
let languageOptions = allLanguages[CountryService.getUserCountryIso2()] || [defaultLocale];

if (typeof languageOptions === 'string') {
  languageOptions = [languageOptions];
}

const availableLocales = BootstrapService.getAppValue('locales', [defaultLocale]);

const LanguageService = {
  DEFAULT_LOCALE: defaultLocale,
  AVAILABLE_LOCALES: availableLocales,
  CLEARVIN_AVAILABLE_LOCALES: ['en', 'ru', 'pl', 'es'],
  OPTIONS: languageOptions
    .filter((value) => availableLocales.includes(value))
    .map((item) => ({ value: item, label: labels[item] || item })),

  getIntlLocale() {
    const currentLocale = this.getCurrentLocale();
    let countryIso2 = CountryService.getUserCountryIso2();

    if (currentLocale === 'ru') {
      countryIso2 = 'RU';
    }

    return `${currentLocale}-${countryIso2}`;
  },

  getCurrentLocale() {
    // This block works for dev:serve to get locale from url cause on dev mode document.documentElement.lang is always en
    if (process.env.NODE_ENV === 'development') {
      return window.location.pathname.split('/')[1];
    }

    return document.documentElement.lang || LanguageService.DEFAULT_LOCALE;
  },

  getLanguageByLocale(locale) {
    return labels[locale] || locale;
  },

  getSupportedLocale() {
    const locale = this.getCurrentLocale();

    if (this.AVAILABLE_LOCALES.includes(locale)) {
      return locale;
    }

    return this.DEFAULT_LOCALE;
  },

  isCurrentLocale(locale) {
    return LanguageService.getCurrentLocale() === locale;
  },

  getClearvinSupportedLocale() {
    const locale = this.getCurrentLocale();

    if (this.CLEARVIN_AVAILABLE_LOCALES.includes(locale)) {
      return locale;
    }

    return this.DEFAULT_LOCALE;
  },

  async changeLocale(value = 'en') {
    // eslint-disable-next-line global-require
    const CustomerService = require('../CustomerService').default;

    try {
      if (window.customer && window.customer.id) {
        await CustomerService.updateCustomerLocale(window.customer.id, { locale: value });
      }
    } catch (error) {
      /** Ignore */
    }

    // eslint-disable-next-line global-require
    const RouterService = require('../RouterService').default;
    window.location = RouterService.replaceLocaleInPath(window.location.pathname + window.location.search, value);
  },
};

LanguageService.LANGUAGE_TAGS = {
  enUS: 'en-US',
  enCA: 'en-CA',
  ruRU: 'ru-RU',
};

LanguageService.LOCALES = {
  DE: 'de',
};

export default LanguageService;
