import React from 'react';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BidNow({ currentBid, currency, currencyFeeFormat, href, isIncrease, onBidNowButtonClick, maxBid }) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.info}>
        <div className={classes.caption}>
          <FormattedMessage id="shared.label.currentBid" className={classes.caption} />:
        </div>
        <div className={classes.valueWrap}>
          <div className={classes.value}>{NumberService.formatCurrency(currentBid, currencyFeeFormat)}</div>&nbsp;
          <div className={classes.currency}>{currency}</div>
        </div>
      </div>

      {typeof maxBid === 'number' && (
        <div className={classes.maxBid}>
          <div className={classes.caption}>
            <FormattedMessage id="shared.label.maxBid" className={classes.caption} />:
          </div>
          <div className={classes.valueWrap}>
            <div className={classes.value}>{NumberService.formatCurrency(maxBid, currencyFeeFormat)}</div>&nbsp;
            <div className={classes.currency}>{currency}</div>
          </div>
        </div>
      )}

      <Button
        href={href}
        className={classes.button}
        onClick={onBidNowButtonClick}
        label={<FormattedMessage id={isIncrease ? 'shared.cta.increaseBid' : 'shared.cta.bidNow'} />}
      />
    </div>
  );
}

BidNow.propTypes = {
  currentBid: PropTypes.number.isRequired,
  maxBid: PropTypes.number,
  currency: PropTypes.string.isRequired,
  currencyFeeFormat: PropTypes.string.isRequired,
  onBidNowButtonClick: PropTypes.func,
  href: PropTypes.string.isRequired,
  isIncrease: PropTypes.bool.isRequired,
};

BidNow.defaultProps = {
  onBidNowButtonClick: () => {},
  maxBid: null,
};

export default BidNow;
