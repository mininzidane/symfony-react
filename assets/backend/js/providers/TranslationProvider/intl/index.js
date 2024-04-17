import { createIntl, createIntlCache } from 'react-intl';
import LanguageService from 'backend/js/api/LanguageService';
import phrased from './phraseapp';

const locale = LanguageService.getSupportedLocale();

let intl = createIntl({
  locale,
  messages: {},
});

const messagesLoader = {
  en: () => import('../../../translations/en.json'),
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
