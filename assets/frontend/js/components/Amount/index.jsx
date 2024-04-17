import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function Amount({
  value,
  currency,
  hasCurrency,
  hasCents,
  className,
  fontSize,
  lineHeight,
  isCurrencyBold,
  fontWeight,
  ...props
}) {
  const classes = useStyles({ fontSize, lineHeight, fontWeight });

  return (
    <strong className={classnames(classes.root, className)} {...props}>
      {NumberService.formatCurrency(value, currency, hasCents)}{' '}
      {hasCurrency && <span className={!isCurrencyBold && classes.currency}>{currency}</span>}
    </strong>
  );
}

Amount.propTypes = {
  value: PropTypes.number,
  hasCurrency: PropTypes.bool,
  hasCents: PropTypes.bool,
  isCurrencyBold: PropTypes.bool,
  currency: PropTypes.string,
  className: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.number,
  lineHeight: PropTypes.number,
};

Amount.defaultProps = {
  value: 0,
  hasCurrency: false,
  hasCents: false,
  isCurrencyBold: false,
  currency: 'USD',
  className: '',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 20,
};

export default Amount;
