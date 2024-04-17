/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const fs = require('fs');

const cliArgs = process.argv.slice(2);
const SOURCE_LOCALE = cliArgs.length === 2 ? cliArgs[0] : 'en';
const TARGET_LOCALE = cliArgs.length === 2 ? cliArgs[1] : cliArgs[0];

const source = JSON.parse(fs.readFileSync(`../${SOURCE_LOCALE}.json`, 'utf8'));
const target = JSON.parse(fs.readFileSync(`../${TARGET_LOCALE}.json`, 'utf8'));

const missing = [];

Object.keys(source).map((key) => !target[key] && missing.push(`"${key}": "${source[key]}"`));

console.log(missing.length ? missing.join('\n') : 'No missing translations ✅');
