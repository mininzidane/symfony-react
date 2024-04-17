import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

function Note({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>{children}</div>
    </div>
  );
}

Note.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Note;
