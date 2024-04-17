function importAll(r) {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = {
  US: importAll(require.context('./us')),
  UA: importAll(require.context('./ua')),
  NG: importAll(require.context('./ng')),
  RU: importAll(require.context('./ru')),
  BY: importAll(require.context('./by')),
  SV: importAll(require.context('./sv')),
  HN: importAll(require.context('./hn')),
  GE: importAll(require.context('./ge')),
  RO: importAll(require.context('./ro')),
  BG: importAll(require.context('./bg')),
};

export default images;
