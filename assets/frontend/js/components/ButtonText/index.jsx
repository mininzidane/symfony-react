import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';
import SpinnerWheel from '../SpinnerWheel';

function ButtonText({
  label,
  type,
  color,
  size,
  href,
  className,
  isRegularCase,
  isLoading,
  isDisabled,
  fontWeight,
  onClick,
  onMouseDown,
  tabIndex,
  style,
}) {
  const classes = useStyles();
  const buttonClasses = classNames(
    classes.root,
    `is-${color}`,
    `is-${size}`,
    {
      'is-regular-case': isRegularCase,
      'is-disabled': isDisabled,
      'is-loading': isLoading,
    },
    className,
  );

  const customStyles = {
    ...style,
    ...(fontWeight && { fontWeight }),
  };

  const spinnerSettings = {
    color,
    sizes: { lg: 20, md: 18, sm: 15 },
    margins: { lg: '11px', md: '9px', sm: '7px' },
  };

  const ButtonComponent = href ? 'a' : 'button';

  return (
    <ButtonComponent
      type={href ? null : type}
      href={href}
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={buttonClasses}
      tabIndex={tabIndex}
      disabled={isDisabled}
      style={customStyles}
    >
      {isLoading && (
        <SpinnerWheel
          style={{ marginRight: [spinnerSettings.margins[size]] }}
          size={spinnerSettings.sizes[size]}
          color={spinnerSettings.color}
        />
      )}

      <span>{label}</span>
    </ButtonComponent>
  );
}

ButtonText.propTypes = {
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
  fontWeight: PropTypes.number,
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  href: PropTypes.string,
  isRegularCase: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  tabIndex: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
};

ButtonText.defaultProps = {
  type: 'button',
  color: 'blue',
  size: 'md',
  className: '',
  href: null,
  isRegularCase: false,
  fontWeight: null,
  isDisabled: false,
  isLoading: false,
  tabIndex: null,
  style: {},
  onClick: () => {},
  onMouseDown: () => {},
};

export default ButtonText;
