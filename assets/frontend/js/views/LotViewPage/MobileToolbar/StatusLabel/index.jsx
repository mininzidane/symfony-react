import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import BidStatusLabel from 'frontend/js/components/BidStatusLabel';
import useStyles from './useStyles';

function StatusLabel({ bidStatus, amount, onClick, currency }) {
  const classes = useStyles();
  const bidStatusKey = bidStatus.replace(/\s/g, '_').replace(/\W/g, '').toLowerCase();

  return (
    <div onClick={onClick} onKeyPress={onClick} rel="noopener noreferrer" role="button" tabIndex={0}>
      <div className={classes.status}>
        {bidStatusKey === 'you_havent_bid' ? (
          <FormattedMessage id="shared.label.currentBid" />
        ) : (
          <BidStatusLabel bidStatus={bidStatus} isSmall />
        )}
      </div>

      <div className={classes.amount}>
        {NumberService.formatCurrency(amount)}

        <span className={classes.currency}>&nbsp;{currency}</span>
      </div>
    </div>
  );
}

StatusLabel.propTypes = {
  bidStatus: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number,
  onClick: PropTypes.func,
};

StatusLabel.defaultProps = {
  amount: null,
  onClick: () => {},
};

export default StatusLabel;
