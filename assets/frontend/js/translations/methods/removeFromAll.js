/* eslint-disable no-console */
const funcs = require('./funcs');

const [key] = process.argv.slice(2);

funcs.locales.forEach((locale) => {
  funcs.remove(locale, key);
});
