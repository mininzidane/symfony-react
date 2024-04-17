import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Control({ icon, label, onClick }) {
  const classes = useStyles();

  return (
    <button type="button" className={classes.root} onClick={onClick}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.label}>{label}</div>
    </button>
  );
}

Control.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Control;
