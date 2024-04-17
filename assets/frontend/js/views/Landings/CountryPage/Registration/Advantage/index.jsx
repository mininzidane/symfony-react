import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Checkmark({ children }) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}

Checkmark.defaultProps = {};

Checkmark.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Checkmark;
