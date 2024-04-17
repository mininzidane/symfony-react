import React from 'react';
import PropTypes from 'prop-types';
import NumberService from 'frontend/js/lib/utils/NumberService';
import UpgradeLink from '../UpgradeLink';
import DepositLink from '../DepositLink';

function FinalBid({ className, value, requireDeposit, requireUpgrade }) {
  if (requireUpgrade) {
    return <UpgradeLink />;
  }

  if (requireDeposit) {
    return <DepositLink />;
  }

  if (!value) {
    return <div>—</div>;
  }

  return (
    <div className={className}>
      <strong>{NumberService.formatCurrency(value)}</strong>
    </div>
  );
}

FinalBid.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  requireDeposit: PropTypes.bool,
  requireUpgrade: PropTypes.bool,
};

FinalBid.defaultProps = {
  value: null,
  className: '',
  requireDeposit: false,
  requireUpgrade: false,
};

export default FinalBid;
