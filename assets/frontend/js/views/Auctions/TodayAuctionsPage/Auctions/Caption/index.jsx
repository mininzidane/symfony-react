import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function Caption({ label, color }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classnames(classes.icon, `bg-${color}`)} />
      <div>{label}</div>
    </div>
  );
}

Caption.propTypes = {
  label: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

export default Caption;
