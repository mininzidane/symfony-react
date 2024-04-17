import CurrencyService from 'frontend/js/api/CurrencyService';
import LotService from 'frontend/js/api/LotService';
import useExchangeRate from 'frontend/js/hooks/useExchangeRate';
import useLot from 'frontend/js/hooks/useLot';
import useFees from './useFees';
import useShipping from './useShipping';
import useCountryRates from './useCountryRates';
import useInsurance from './useInsurance';
import useUnlimitedAuctionStorage from './useUnlimitedAuctionStorage';
import useElectricFee from './useElectricFee';

function useValues(refinements, config) {
  const values = {
    price: refinements.price,
    exchangeRate: null,
    currency: null,
    fees: {},
    shipping: {},
    countryRates: {},
    insurance: null,
    unlimitedAuctionStorage: null,
    electricFee: null,
    lot: null,
    auction: LotService.AUCTION_COPART,
    lotExchangeRate: null,
    source: refinements.source,
  };

  const [lot] = useLot(refinements.lotIdOrVin, refinements.auction);
  values.lot = lot;
  values.auction = refinements.auction;
  values.currency =
    lot && lot.currencyFeeFormat !== CurrencyService.CURRENCY_USD
      ? lot.currencyFeeFormat
      : CurrencyService.CURRENCIES[refinements.countryId];
  values.exchangeRate = useExchangeRate(values.currency);
  values.lotExchangeRate = useExchangeRate(values.lot && values.lot.currency);
  values.countryRatesExchangeRate = useExchangeRate(refinements.countryRatesCurrency);

  if (config.receipt.fees) {
    values.fees = useFees({ refinements, values });
  }
  if (config.receipt.shipping) {
    values.shipping = useShipping({ refinements, values });
  }
  values.insurance = useInsurance({ refinements, values });
  if (config.receipt.unlimitedAuctionStorage) {
    values.unlimitedAuctionStorage = useUnlimitedAuctionStorage({ values });
  }
  if (config.receipt.electricFee) {
    values.electricFee = useElectricFee({ refinements, values });
  }
  if (config.receipt.countryRates) {
    values.countryRates = useCountryRates({ refinements, values });
  }

  return values;
}

export default useValues;
