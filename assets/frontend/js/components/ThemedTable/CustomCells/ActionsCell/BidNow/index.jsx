import React from 'react';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BidNow({ currentBid, currency, href, isIncrease, buyItNow, onBidNowClick, onBuyItNowClick }) {
  const hasBuyItNow = Boolean(buyItNow);
  const classes = useStyles({ hasBuyItNow });

  return (
    <div className={classes.root}>
      <strong className={classes.label}>
        {NumberService.formatCurrency(currentBid)} <span>{currency}</span>
      </strong>

      <Button
        href={href}
        className={classes.button}
        onClick={onBidNowClick}
        size="sm"
        color="blue"
        label={<FormattedMessage id={isIncrease ? 'shared.cta.increaseBid' : 'shared.cta.bidNow'} />}
        isCapitalize
      />

      {hasBuyItNow && (
        <a href={href} className={classes.buyItNowLink} onClick={onBuyItNowClick}>
          <FormattedMessage id="shared.cta.buyItNow" />: <strong>{NumberService.formatCurrency(buyItNow)}</strong>{' '}
          <span>{currency}</span>
        </a>
      )}
    </div>
  );
}

BidNow.propTypes = {
  currentBid: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isIncrease: PropTypes.bool.isRequired,
  buyItNow: PropTypes.number,
  onBidNowClick: PropTypes.func,
  onBuyItNowClick: PropTypes.func,
};

BidNow.defaultProps = {
  onBuyItNowClick: () => {},
  onBidNowClick: () => {},
  buyItNow: null,
};

export default BidNow;
