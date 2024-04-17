/* eslint-disable no-console */
const funcs = require('./funcs');

funcs.locales.forEach((locale) => {
  const translations = funcs.parseFile(locale);
  const translationsLength = Object.keys(translations).length;

  console.log(`${locale}: ${translationsLength}`);
});
