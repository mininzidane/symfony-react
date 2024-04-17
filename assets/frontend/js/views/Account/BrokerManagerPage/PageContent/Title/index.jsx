import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Title({ text, hasTopMargin }) {
  const classes = useStyles({ hasTopMargin });

  return <h2 className={classes.root}>{text}</h2>;
}

Title.propTypes = {
  text: PropTypes.node.isRequired,
  hasTopMargin: PropTypes.bool,
};

Title.defaultProps = {
  hasTopMargin: true,
};

export default Title;
