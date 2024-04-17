import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

function Section({ children }) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Section;
