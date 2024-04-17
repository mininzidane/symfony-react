import PropTypes from 'prop-types';

const feeTable = PropTypes.shape({
  defaultRate: PropTypes.number,
  defaultAmount: PropTypes.number,
  rates: PropTypes.object,
});

const LotFeesShape = PropTypes.shape({
  feesTable: feeTable,
  virtualFeesTable: feeTable,
  gateFee: PropTypes.number,
  brokerFee: PropTypes.number,
  documentationFee: PropTypes.number,
  transactionFeePerc: PropTypes.number,
  transactionFeePremiumPerc: PropTypes.number,
  transactionFeeMin: PropTypes.number,
  hasStateTax: PropTypes.bool,
  stateTaxRate: PropTypes.number,
  salesTaxState: PropTypes.string,
  discretionarySurtaxRate: PropTypes.number,
  surtaxThreshold: PropTypes.number,
  intlWirePayment: PropTypes.number,
  stateTaxNotTitleFee: PropTypes.number,
  stateTaxAdditionalFee: PropTypes.number,
  transactionFeeCustomRules: PropTypes.array,
});

export default LotFeesShape;
