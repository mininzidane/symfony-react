import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

function Red({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.icon} />
      {children}
    </div>
  );
}

Red.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Red;
