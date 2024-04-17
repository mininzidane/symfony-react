/* eslint-disable curly */
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

function useTotal(values, config, isRateEnabled) {
  const { price, fees, shipping, insurance, unlimitedAuctionStorage, electricFee, countryRates, lotExchangeRate, vat } =
    values;

  let terms = [];

  if (config.receipt.price) terms.push(price / lotExchangeRate);
  if (config.receipt.fees) terms.push(fees.totalFees);
  if (config.receipt.shipping) terms.push(shipping.total);
  if (config.receipt.insurance && insurance) {
    terms.push(
      isRateEnabled('insurance', ShippingOrderService.INSURANCE_TOTAL_LOSS_COVERAGE_ID) && insurance.totalLossCoverage
        ? insurance.totalLossCoverage
        : 0,
    );
    terms.push(
      isRateEnabled('insurance', ShippingOrderService.INSURANCE_FULL_COVERAGE_ID) && insurance.fullCoverage
        ? insurance.fullCoverage
        : 0,
    );
  }
  if (config.receipt.unlimitedAuctionStorage) {
    terms.push(isRateEnabled('unlimitedAuctionStorage') && unlimitedAuctionStorage ? unlimitedAuctionStorage : 0);
  }
  if (config.receipt.electricFee) terms.push(isRateEnabled('electricFee') && electricFee ? electricFee : 0);
  if (config.receipt.countryRates) {
    terms.push(
      ...Object.keys(countryRates)
        .filter((key) => isRateEnabled(key))
        .map((key) => countryRates[key]),
    );
  }

  terms = terms.map((v) => Math.round(v));

  const total = terms.reduce((acc, curr) => acc + curr, 0);
  const subTotal = terms.filter(Boolean).reduce((acc, curr) => acc + curr, 0);

  return { total, subTotal };
}

export default useTotal;
