import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BuyItNow({ buyItNow, href }) {
  const classes = useStyles();

  return (
    <a href={href} className={classes.root}>
      <FormattedMessage id="shared.cta.buyItNow" />:{' '}
      <strong className={classes.value}>{NumberService.formatCurrency(buyItNow)}</strong>
    </a>
  );
}

BuyItNow.propTypes = {
  buyItNow: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
};

export default BuyItNow;
