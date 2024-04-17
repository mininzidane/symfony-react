/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const fs = require('fs');
const funcs = require('./funcs');

const cliArgs = process.argv.slice(2);
const TARGET_LOCALE = cliArgs.length ? cliArgs[0] : null;
const source = JSON.parse(fs.readFileSync(`../en.json`, 'utf8'));

const exceptions = {
  es: ['Balance', 'VIN', 'Color', 'Sub total', 'SMS', 'Total', 'No', 'd', 'h', 'm', 's'],
  pl: ['Region', 'Status', 'Email', 'Port', 'SMS', 'Lot #', 'd', 'm', 's'],
  ru: ['VIN', 'SMS'],
  ka: ['VIN'],
  de: ['Balance', 'Status', 'Name', 'SMS', 'OK', 'Email', 'Total', 'm', 's'],
  ar: [],
};

function getDuplicateTranslations(locale) {
  const missing = [];
  const translations = funcs.parseFile(locale);

  Object.keys(source).map((key) => {
    const isException = exceptions[locale].includes(source[key]);

    if (source[key] === translations[key] && !isException) {
      missing.push(`"${key}": "${source[key]}"`);
    }
  });

  console.log(missing.length ? missing.join('\n') : 'No duplicate translations ✅');
}

if (TARGET_LOCALE) {
  getDuplicateTranslations(TARGET_LOCALE);
} else {
  funcs.locales.forEach((locale) => {
    if (locale === 'en') {
      return null;
    }

    console.log(`********** Duplicate ${locale} translations **********`);
    getDuplicateTranslations(locale);

    return null;
  });
}
