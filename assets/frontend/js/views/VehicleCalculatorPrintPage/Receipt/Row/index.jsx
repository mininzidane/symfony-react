import React from 'react';
import PropTypes from 'prop-types';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function Row({ title, value, currency }) {
  const classes = useStyles();

  if (!value) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.value}>
        <strong>{NumberService.formatCurrency(value)}</strong> {currency}
      </div>
    </div>
  );
}

Row.defaultProps = {
  currency: 'USD',
};

Row.propTypes = {
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  currency: PropTypes.string,
};

export default Row;
