import React from 'react';
import PropTypes from 'prop-types';
import UpgradeLink from '../UpgradeLink';
import DepositLink from '../DepositLink';

function Seller({ value, requireDeposit, requireUpgrade }) {
  if (requireUpgrade) {
    return <UpgradeLink />;
  }

  if (requireDeposit) {
    return <DepositLink />;
  }

  if (!value) {
    return <div>—</div>;
  }

  return <div>{value}</div>;
}

Seller.propTypes = {
  value: PropTypes.string,
  requireDeposit: PropTypes.bool,
  requireUpgrade: PropTypes.bool,
};

Seller.defaultProps = {
  value: null,
  requireDeposit: false,
  requireUpgrade: false,
};

export default Seller;
