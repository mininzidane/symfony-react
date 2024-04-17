import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import useStyles from './useStyles';
import OkIcon from './OkIcon';

const Row = ({ children, className }) => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.text}>{children}</div>
      <div>
        <OkIcon />
      </div>
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Row.defaultProps = {
  className: '',
};

export default Row;
