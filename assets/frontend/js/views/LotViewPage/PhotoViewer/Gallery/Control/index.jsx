import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Control({ children, className, ...props }) {
  const classes = useStyles();

  return (
    <div {...props} className={classnames(classes.root, className)}>
      {children}
    </div>
  );
}

Control.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Control.defaultProps = {
  className: '',
};

export default Control;
