import isEmpty from 'lodash/isEmpty';
import useLotFees from 'frontend/js/hooks/useLotFees';
import useBidFeeCalculator from 'frontend/js/hooks/useBidFeeCalculator';

function useFees({ refinements, values }) {
  const { price, countryId } = refinements;
  const { lot } = values;

  const lotFees = useLotFees(lot && lot.id, lot && lot.inventoryAuction);
  const fees = useBidFeeCalculator(lotFees, price, countryId);

  if (isEmpty(lotFees)) {
    return {};
  }

  return fees;
}

export default useFees;
