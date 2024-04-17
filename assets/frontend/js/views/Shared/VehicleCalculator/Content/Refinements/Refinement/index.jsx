import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Refinement({ label, input }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      <div className={classes.input}>{input}</div>
    </div>
  );
}

Refinement.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.node.isRequired,
};

export default Refinement;
