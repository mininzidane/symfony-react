import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function Step({ label, active, completed, index, total }) {
  const classes = useStyles({ total, index });

  return (
    <div className={classNames({ [classes.active]: active, [classes.completed]: completed })}>
      <div className={classes.dot}>{index + 1}</div>
      <div className={classes.label}>{label}</div>
      {index !== 0 && <div className={classes.connector} />}
    </div>
  );
}

Step.propTypes = {
  label: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Step;
