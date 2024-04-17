import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function Row({ condition, value, label, className }) {
  const classes = useStyles();

  if (!condition) {
    return null;
  }

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.label}>{label}:</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
}

Row.propTypes = {
  className: PropTypes.string,
  condition: PropTypes.bool,
  value: PropTypes.node,
  label: PropTypes.node.isRequired,
};

Row.defaultProps = {
  className: '',
  condition: false,
  value: '',
};

export default Row;
