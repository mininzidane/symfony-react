/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const funcs = require('./funcs');

const cliArgs = process.argv.slice(2);
const SOURCE_LOCALE = cliArgs.length === 2 ? cliArgs[0] : 'en';

const source = funcs.parseFile(SOURCE_LOCALE);

funcs.locales.forEach((locale) => {
  if (locale === SOURCE_LOCALE) {
    return;
  }

  const target = funcs.parseFile(locale);
  const before = Object.keys(target).length;

  Object.keys(source).forEach((key) => {
    if (!(key in target)) {
      target[key] = source[key];
    }
  });

  funcs.writeFile(locale, target);

  console.log(`Added \x1b[33m${Object.keys(target).length - before}\x1b[0m keys to \x1b[33m${locale}\x1b[0m ✅`);
});
