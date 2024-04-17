import BootstrapService from 'backend/js/api/BootstrapService';
import CountryService from 'frontend/js/api/CountryService';

const defaultLocale = 'en';

const allLanguages = BootstrapService.getAppValue('countryLocales', {});
let languageOptions = allLanguages[CountryService.getUserCountryIso2()] || [defaultLocale];

if (typeof languageOptions === 'string') {
  languageOptions = [languageOptions];
}

const availableLocales = BootstrapService.getAppValue('locales', [defaultLocale]);

const LanguageService = {
  DEFAULT_LOCALE: defaultLocale,
  AVAILABLE_LOCALES: availableLocales,

  getIntlLocale() {
    return defaultLocale;
  },

  getCurrentLocale() {
    return defaultLocale;
  },

  getSupportedLocale() {
    return this.DEFAULT_LOCALE;
  },
};

export default LanguageService;
