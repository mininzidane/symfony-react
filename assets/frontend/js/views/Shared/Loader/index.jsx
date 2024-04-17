import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useStyles from './useStyles';

function Loader({ minHeight, className, ...props }) {
  const classes = useStyles({ minHeight });

  return (
    <div className={classnames(classes.root, className)} {...props}>
      <SpinnerWheel size={40} thickness={3} color="blue" isCentered />
    </div>
  );
}

Loader.propTypes = {
  minHeight: PropTypes.number,
  className: PropTypes.string,
};

Loader.defaultProps = {
  minHeight: 400,
  className: '',
};

export default Loader;
