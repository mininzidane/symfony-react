import CountryService from 'frontend/js/api/CountryService';
import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const CurrencyService = {
  getExchangeRate(currencyCode) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`exchange-rates/${currencyCode}`, true),
    ).then(({ data }) => data);
  },

  getAllExchangeRates() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`exchange-rates`, true)).then(
      ({ data }) => data,
    );
  },
};

CurrencyService.CURRENCIES = {
  [CountryService.COUNTRIES.belarus.code]: 'EUR',
  [CountryService.COUNTRIES.ukraine.code]: 'EUR',
  [CountryService.COUNTRIES.elSalvador.code]: 'USD',
  [CountryService.COUNTRIES.russia.code]: 'EUR',
  [CountryService.COUNTRIES.nigeria.code]: 'NGN',
};

CurrencyService.CURRENCY_USD_SYMBOL = '$';
CurrencyService.CURRENCY_EUR_SYMBOL = '€';
CurrencyService.CURRENCY_USD = 'USD';
CurrencyService.CURRENCY_EUR = 'EUR';

CurrencyService.CURRENCY_SYMBOLS = {
  [CurrencyService.CURRENCY_USD]: CurrencyService.CURRENCY_USD_SYMBOL,
  [CurrencyService.CURRENCY_EUR]: CurrencyService.CURRENCY_EUR_SYMBOL,
};

export default CurrencyService;
