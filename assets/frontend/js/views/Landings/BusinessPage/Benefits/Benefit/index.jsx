import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import CheckmarkSvg from './img/checkmark.svg';

function Benefit({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={CheckmarkSvg} className={classes.checkmarkIcon} alt="Преимущество" />
      {children}
    </div>
  );
}

Benefit.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Benefit;
