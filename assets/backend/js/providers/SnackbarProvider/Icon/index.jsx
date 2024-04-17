import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Icon({ className, variant }) {
  const classes = useStyles();
  return (
    <div
      className={classnames(classes.root, className, {
        'is-success': variant === 'success',
        'is-error': variant === 'error',
      })}
    >
      {variant === 'success' && (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 15.2353L12.84 19L21 11" stroke="white" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
}

Icon.defaultProps = {
  className: '',
  variant: '',
};

Icon.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'error', 'info']),
};

export default Icon;
