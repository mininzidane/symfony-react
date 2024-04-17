/* eslint-disable no-console */
const funcs = require('./funcs');

const [key, value] = process.argv.slice(2);

funcs.locales.forEach((locale) => {
  funcs.add(locale, key, value);
});
