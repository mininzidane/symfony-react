import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function Container({ className, children, ...rest }) {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)} {...rest}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Container.defaultProps = {
  children: null,
  className: '',
};

export default Container;
