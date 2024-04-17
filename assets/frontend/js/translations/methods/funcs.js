/* eslint-disable no-console */
const fs = require('fs');

const path = `${__dirname}/../`;
const locales = fs
  .readdirSync(path)
  .filter((v) => /.*.json$/.test(v))
  .map((v) => v.split('.json')[0]);

function format(obj) {
  const sortedObj = Object.keys(obj)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .reduce((acc, k) => {
      acc[k] = obj[k];

      return acc;
    }, {});

  return JSON.stringify(sortedObj, null, 2);
}

function parseFile(locale) {
  const fileContent = fs.readFileSync(`${path}${locale}.json`, 'utf-8');

  return JSON.parse(fileContent);
}

function writeFile(locale, translations) {
  fs.writeFileSync(`${path}${locale}.json`, format(translations));
}

function get(locale, key) {
  const translations = parseFile(locale);

  return console.log(translations[key] || `No ${locale} translation found.`);
}

function sort(locale) {
  const translations = parseFile(locale);

  writeFile(locale, translations);
  console.log(`\x1b[33m${locale}\x1b[0m has been formatted ✅`);
}

function add(locale, key, value) {
  const translations = parseFile(locale);
  translations[key] = value;

  writeFile(locale, translations);
  console.log(`\x1b[33m${key}\x1b[0m translation added for \x1b[33m${locale}\x1b[0m ✅`);
}

function remove(locale, key) {
  const translations = parseFile(locale);
  delete translations[key];

  writeFile(locale, translations);
  console.log(`\x1b[33m${key}\x1b[0m translation removed for \x1b[33m${locale}\x1b[0m ✅`);
}

module.exports = { add, remove, get, parseFile, writeFile, sort, locales };
