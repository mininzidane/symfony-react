import { createIntl, createIntlCache } from 'react-intl';
import LanguageService from 'frontend/js/api/LanguageService';
import phrased from './phraseapp';

const locale = LanguageService.getSupportedLocale();

let intl = createIntl({
  locale,
  messages: {},
});

// This block works for dev:serve to sync serve translations avoid console errors & glitches
if (process.env.NODE_ENV === 'development') {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/translations/${locale}.json`, false);
    xhr.send();

    intl = createIntl({
      locale,
      messages: JSON.parse(xhr.response),
    });
  } catch (e) {
    // ignore
  }
}

const messagesLoader = {
  en: () => import('../../../translations/en.json'),
  es: () => import('../../../translations/es.json'),
  pl: () => import('../../../translations/pl.json'),
  ru: () => import('../../../translations/ru.json'),
  ka: () => import('../../../translations/ka.json'),
  de: () => import('../../../translations/de.json'),
  ar: () => import('../../../translations/ar.json'),
  sq: () => import('../../../translations/sq.json'),
  bg: () => import('../../../translations/bg.json'),
  ro: () => import('../../../translations/ro.json'),
  ko: () => import('../../../translations/ko.json'),
  it: () => import('../../../translations/it.json'),
  uk: () => import('../../../translations/uk.json'),
};

messagesLoader[locale]().then((messages) => {
  const cache = createIntlCache();
  intl = createIntl(
    {
      locale,
      messages,
    },
    cache,
  );
});

export default {
  formatMessage: phrased((...args) => intl.formatMessage(...args)),
};
