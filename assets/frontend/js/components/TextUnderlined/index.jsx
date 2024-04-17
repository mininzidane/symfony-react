import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function TextUnderlined({ children, hasInitialLine }) {
  const classes = useStyles({ hasInitialLine });

  return <span className={classes.root}>{children}</span>;
}

TextUnderlined.propTypes = {
  children: PropTypes.node.isRequired,
  hasInitialLine: PropTypes.bool,
};

TextUnderlined.defaultProps = {
  hasInitialLine: false,
};

export default TextUnderlined;
