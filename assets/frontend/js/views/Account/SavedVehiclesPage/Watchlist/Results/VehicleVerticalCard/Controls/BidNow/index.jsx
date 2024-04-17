import React from 'react';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BidNow({ currentBid, currency, currencyFeeFormat, href, isIncrease }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.caption}>
          <FormattedMessage id="shared.label.currentBid" /> ({currency})
        </div>
        <div className={classes.value}>{NumberService.formatCurrency(currentBid, currencyFeeFormat)}</div>
      </div>

      <Button
        href={href}
        className={classes.button}
        label={<FormattedMessage id={isIncrease ? 'shared.cta.increaseBid' : 'shared.cta.bidNow'} />}
      />
    </div>
  );
}

BidNow.propTypes = {
  currentBid: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencyFeeFormat: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isIncrease: PropTypes.bool.isRequired,
};

export default BidNow;
