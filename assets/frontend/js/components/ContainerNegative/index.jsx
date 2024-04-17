import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function ContainerNegative({ className, children, margin }) {
  const classes = useStyles({ margin });

  return <div className={classNames(classes.root, className)}>{children}</div>;
}

ContainerNegative.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  margin: PropTypes.number,
};

ContainerNegative.defaultProps = {
  children: null,
  className: '',
  margin: 14,
};

export default ContainerNegative;
