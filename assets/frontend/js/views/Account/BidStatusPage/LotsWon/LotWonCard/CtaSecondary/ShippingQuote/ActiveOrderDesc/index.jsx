import React from 'react';
import PropTypes from 'prop-types';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function ActiveOrderDesc({ className, desc, total }) {
  const classes = useStyles();

  return (
    <div className={className}>
      <div>{desc}</div>
      {total && (
        <div className={classes.total}>
          <strong>{NumberService.formatCurrency(total, 'USD', true)}</strong>{' '}
          <span className={classes.currency}>USD</span>
        </div>
      )}
    </div>
  );
}

ActiveOrderDesc.propTypes = {
  className: PropTypes.string,
  desc: PropTypes.node,
  total: PropTypes.number,
};

ActiveOrderDesc.defaultProps = {
  className: '',
  desc: '',
  total: null,
};

export default ActiveOrderDesc;
