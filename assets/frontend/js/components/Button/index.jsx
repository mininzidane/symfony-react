import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useAttributeRel from 'frontend/js/hooks/useAttributeRel';
import SpinnerWheel from '../SpinnerWheel';
import useStyles from './useStyles';

function Button({
  label,
  type,
  color,
  size,
  href,
  className,
  isRegularCase,
  isSquared,
  isInline,
  isNowrap,
  isShadowless,
  isLoading,
  isDisabled,
  isTargetBlank,
  isNofollow,
  isNoopener,
  isNoreferrer,
  isCapitalize,
  onClick,
  tabIndex,
  style,
  fontSize,
  ...props
}) {
  const classes = useStyles();
  const buttonClasses = classNames(
    classes.root,
    `is-${color}`,
    `is-${size}`,
    {
      'is-shadowless': isShadowless,
      'is-regular-case': isRegularCase,
      'is-capitalize': isCapitalize,
      'is-squared': isSquared,
      'is-disabled': isDisabled,
      'is-loading': isLoading,
      'is-inline': isInline,
      'is-nowrap': isNowrap,
    },
    className,
  );

  const customStyles = {
    ...style,
    ...(fontSize && { fontSize }),
  };

  const spinnerSettings = {
    color: color === 'yellow' ? 'black' : 'white',
    margins: { lg: '11px', md: '9px', sm: '7px' },
    sizes: { lg: 20, md: 18, sm: 15 },
  };

  const ButtonComponent = href ? 'a' : 'button';
  const LabelComponent = typeof label === 'string' ? <span>{label}</span> : label;

  const rel = useAttributeRel({ isNofollow, isNoopener, isNoreferrer });

  return (
    <ButtonComponent
      type={href ? null : type}
      href={href}
      onClick={onClick}
      className={buttonClasses}
      tabIndex={tabIndex}
      disabled={isDisabled}
      style={customStyles}
      target={isTargetBlank ? '_blank' : null}
      rel={rel}
      {...props}
    >
      {isLoading && (
        <SpinnerWheel
          color={spinnerSettings.color}
          size={spinnerSettings.sizes[size]}
          style={{ marginRight: [spinnerSettings.margins[size]] }}
        />
      )}

      {LabelComponent}
    </ButtonComponent>
  );
}

Button.propTypes = {
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  href: PropTypes.string,
  isSquared: PropTypes.bool,
  isInline: PropTypes.bool,
  isNowrap: PropTypes.bool,
  isRegularCase: PropTypes.bool,
  isCapitalize: PropTypes.bool,
  isShadowless: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isTargetBlank: PropTypes.bool,
  isNofollow: PropTypes.bool,
  isNoopener: PropTypes.bool,
  isNoreferrer: PropTypes.bool,
  tabIndex: PropTypes.string,
  fontSize: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  color: 'blue',
  size: 'md',
  className: '',
  href: null,
  isRegularCase: false,
  isCapitalize: false,
  isShadowless: false,
  isSquared: false,
  isInline: false,
  isNowrap: false,
  isDisabled: false,
  isTargetBlank: false,
  isNofollow: false,
  isNoopener: false,
  isNoreferrer: false,
  isLoading: false,
  tabIndex: null,
  fontSize: null,
  style: {},
  onClick: () => {},
};

export default Button;
