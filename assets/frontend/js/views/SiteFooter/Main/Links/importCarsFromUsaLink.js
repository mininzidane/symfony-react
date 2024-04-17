import t from 'frontend/js/api/TranslatorService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import RouterService from 'frontend/js/api/RouterService';
import CountryService from 'frontend/js/api/CountryService';
import StringService from 'frontend/js/lib/utils/StringService';

const countryCode = BootstrapService.getAppValue('countryCode');
const importCountries = [
  // EN
  'BS',
  'BZ',
  'BJ',
  'CA',
  'GH',
  'LR',
  'ML',
  'MR',
  'NL',
  'NE',
  'SN',
  'TG',
  'GB',
  'CW',

  // ES
  'MX',
  'GT',
  'SV',
  'HN',
  'CR',
  'DO',
  'BO',
  'PA',
  'VE',
  'PE',
  'NI',
  'PY',
];

function getLink() {
  let importCarsFromUsaLink = [];

  const isImportCountry = importCountries.includes(countryCode);
  const countryName = CountryService.COUNTRY_NAMES[countryCode];

  if (isImportCountry && countryName) {
    const href = RouterService.getRoute('importCarsFromUsa', null, false, {
      country: StringService.slugify(countryName),
    });
    const importCarsFromUsaLinkObj = { label: t('footer.links.importCarsFromUsa'), href };
    importCarsFromUsaLink = [importCarsFromUsaLinkObj];
  }

  return importCarsFromUsaLink;
}

export default getLink();
