import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useAttributeRel from 'frontend/js/hooks/useAttributeRel';
import SpinnerWheel from '../SpinnerWheel';
import useStyles from './useStyles';

function ButtonOutlined({
  label,
  type,
  color,
  size,
  href,
  className,
  isSquared,
  isRegularCase,
  isThinBorder,
  isLoading,
  isLoadingSpinnerHidden,
  isDisabled,
  isInline,
  isNowrap,
  id,
  isBackgroundWhite,
  isBackgroundTransparent,
  fontWeight,
  isTargetBlank,
  isNofollow,
  isNoopener,
  isNoreferrer,
  onClick,
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
      'is-squared': isSquared,
      'is-disabled': isDisabled,
      'is-loading': isLoading,
      'is-thin-border': isThinBorder,
      'is-background-white': isBackgroundWhite,
      'is-background-transparent': isBackgroundTransparent,
      'is-inline': isInline,
      'is-nowrap': isNowrap,
    },
    className,
  );

  const customStyles = {
    ...style,
    ...(fontWeight && { fontWeight }),
  };

  const spinnerSettings = {
    color,
    sizes: { lg: '20px', md: '18px', sm: '15px' },
    margins: { lg: '11px', md: '9px', sm: '7px' },
  };

  const ButtonComponent = href ? 'a' : 'button';

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
      id={id}
      target={isTargetBlank ? '_blank' : null}
      rel={rel}
    >
      {isLoading && !isLoadingSpinnerHidden && (
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

ButtonOutlined.propTypes = {
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
  fontWeight: PropTypes.number,
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  href: PropTypes.string,
  isRegularCase: PropTypes.bool,
  isThinBorder: PropTypes.bool,
  isBackgroundWhite: PropTypes.bool,
  isBackgroundTransparent: PropTypes.bool,
  isSquared: PropTypes.bool,
  isNowrap: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoadingSpinnerHidden: PropTypes.bool,
  isInline: PropTypes.bool,
  tabIndex: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
  isTargetBlank: PropTypes.bool,
  isNofollow: PropTypes.bool,
  isNoopener: PropTypes.bool,
  isNoreferrer: PropTypes.bool,
  id: PropTypes.string,
};

ButtonOutlined.defaultProps = {
  type: 'button',
  color: 'blue',
  size: 'md',
  className: '',
  href: null,
  isRegularCase: false,
  isLoadingSpinnerHidden: false,
  isThinBorder: false,
  isBackgroundWhite: false,
  isBackgroundTransparent: false,
  fontWeight: null,
  id: null,
  isTargetBlank: false,
  isNofollow: false,
  isNoopener: false,
  isNoreferrer: false,
  isSquared: false,
  isDisabled: false,
  isInline: false,
  isLoading: false,
  isNowrap: false,
  tabIndex: null,
  style: {},
  onClick: () => {},
};

export default ButtonOutlined;
