import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Row({ value, label }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
}

Row.propTypes = {
  value: PropTypes.node,
  label: PropTypes.node.isRequired,
};

Row.defaultProps = {
  value: '',
};

export default Row;
