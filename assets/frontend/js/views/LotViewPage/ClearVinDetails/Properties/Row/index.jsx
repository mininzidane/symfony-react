import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Row({ condition, value, label, isUpperCase }) {
  const classes = useStyles();

  if (!condition) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}:</div>
      <div className={classes.value}>{isUpperCase ? value.toUpperCase() : value}</div>
    </div>
  );
}

Row.propTypes = {
  condition: PropTypes.bool,
  isUpperCase: PropTypes.bool,
  value: PropTypes.node,
  label: PropTypes.node.isRequired,
};

Row.defaultProps = {
  condition: false,
  isUpperCase: false,
  value: '',
};

export default Row;
