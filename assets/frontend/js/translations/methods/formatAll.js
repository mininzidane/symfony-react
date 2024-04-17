/* eslint-disable no-console */
const funcs = require('./funcs');

funcs.locales.forEach((locale) => {
  funcs.sort(locale);
});
