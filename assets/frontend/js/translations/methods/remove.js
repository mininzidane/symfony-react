const funcs = require('./funcs');

const [locale, key] = process.argv.slice(2);

funcs.remove(locale, key);
