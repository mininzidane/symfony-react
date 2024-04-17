import PropTypes from 'prop-types';

const InvoiceShape = PropTypes.shape({
  token: PropTypes.string,
  paid: PropTypes.bool,
  dueDate: PropTypes.string,
  balanceRemaining: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  amountApplied: PropTypes.string,
  paidInFull: PropTypes.string,
});

export default InvoiceShape;
