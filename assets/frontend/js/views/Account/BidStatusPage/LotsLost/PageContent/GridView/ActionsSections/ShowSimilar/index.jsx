import React from 'react';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function ShowSimilar({ currentBid, currency, href }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.caption}>
          <FormattedMessage id="shared.label.currentBid" className={classes.caption} />:
        </div>
        <div className={classes.valueWrap}>
          <div className={classes.value}>{NumberService.formatCurrency(currentBid)}</div>&nbsp;
          <div className={classes.currency}>{currency}</div>
        </div>
      </div>

      <Button
        href={href}
        className={classes.button}
        isCapitalize
        label={<FormattedMessage id="shared.cta.showSimilar" />}
      />
    </div>
  );
}

ShowSimilar.propTypes = {
  currentBid: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default ShowSimilar;
