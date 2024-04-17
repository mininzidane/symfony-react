import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import LotService from 'frontend/js/api/LotService';

function useInsurance({ refinements, values }) {
  const {
    INSURANCE_TOTAL_LOSS_COVERAGE_PERCENTAGE,
    INSURANCE_FULL_COVERAGE_PERCENTAGE,
    INSURANCE_TOTAL_LOSS_COVERAGE_LOWER_THRESHOLD,
    INSURANCE_FULL_COVERAGE_LOWER_THRESHOLD,
  } = ShippingOrderService;

  const { countryId, price } = refinements;

  if (countryId === ShippingOrderService.CountryIdUS || values.auction === LotService.AUCTION_COPART_DE) {
    return null;
  }

  const totalLossCoverageAmount = Math.round((price * INSURANCE_TOTAL_LOSS_COVERAGE_PERCENTAGE) / 100);
  const fullCoverageAmount = Math.round((price * INSURANCE_FULL_COVERAGE_PERCENTAGE) / 100);
  return {
    totalLossCoverage: Math.max(totalLossCoverageAmount, INSURANCE_TOTAL_LOSS_COVERAGE_LOWER_THRESHOLD),
    fullCoverage: Math.max(fullCoverageAmount, INSURANCE_FULL_COVERAGE_LOWER_THRESHOLD),
  };
}

export default useInsurance;
