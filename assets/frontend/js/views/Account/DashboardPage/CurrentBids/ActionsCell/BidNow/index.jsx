import React from 'react';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BidNow({ currency, href, isIncrease, buyItNow }) {
  const hasBuyItNow = Boolean(buyItNow);
  const classes = useStyles({ hasBuyItNow });

  return (
    <div className={classes.root}>
      <Button
        href={href}
        className={classes.button}
        size="sm"
        color="blue"
        label={<FormattedMessage id={isIncrease ? 'shared.cta.increaseBid' : 'shared.cta.bidNow'} />}
        isCapitalize
      />

      {hasBuyItNow && (
        <a href={href} className={classes.buyItNowLink}>
          <FormattedMessage id="shared.cta.buyItNow" />: <strong>{NumberService.formatCurrency(buyItNow)}</strong>{' '}
          <span>{currency}</span>
        </a>
      )}
    </div>
  );
}

BidNow.propTypes = {
  currency: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isIncrease: PropTypes.bool.isRequired,
  buyItNow: PropTypes.number,
};

BidNow.defaultProps = {
  buyItNow: null,
};

export default BidNow;
