const funcs = require('./funcs');

const [locale, key, value] = process.argv.slice(2);

funcs.add(locale, key, value);
