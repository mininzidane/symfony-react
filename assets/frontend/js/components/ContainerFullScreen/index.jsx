/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import classNames from 'classnames';
import useStyles from './useStyles';

function defineBackgroundImage(background) {
  if (!background) {
    return null;
  }

  const { isBelowSm } = useBreakpoint();
  const prefix = isBelowSm ? 'sm' : 'xl';
  const image_x1 = background[`${prefix}_x1`];
  const image_x2 = background[`${prefix}_x2`];

  return ViewportService.isHighDPI && image_x2 ? image_x2 : image_x1;
}

function ContainerFullScreen({
  className,
  children,
  background,
  isUltraWide,
  isBeyondBackground,
  wrapperClassName,
  ...restProps
}) {
  const classes = useStyles();
  const backgroundImage = defineBackgroundImage(background);
  const backgroundImageStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : null;
  const backgroundColorStyle = background && background.color ? { background: background.color } : null;

  let wrapperStyle = backgroundColorStyle;
  let innerStyle = backgroundImageStyle;

  if (isBeyondBackground) {
    wrapperStyle = wrapperStyle
      ? {
          background: `url(${backgroundImage}) center / cover no-repeat, ${background.color}`,
        }
      : null;
    innerStyle = null;
  }

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <div
        className={classNames(
          classes.root,
          { 'is-ultra-wide': isUltraWide, [classes.hasBackgroundImage]: backgroundImage },
          className,
        )}
        style={innerStyle}
        {...restProps}
      >
        {children}
      </div>
    </div>
  );
}

ContainerFullScreen.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isUltraWide: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  background: PropTypes.shape({
    xl_x1: PropTypes.string,
    xl_x2: PropTypes.string,
    sm_x1: PropTypes.string,
    sm_x2: PropTypes.string,
    color: PropTypes.string,
  }),
  isBeyondBackground: PropTypes.bool,
};

ContainerFullScreen.defaultProps = {
  children: null,
  isUltraWide: false,
  className: '',
  wrapperClassName: '',
  background: null,
  isBeyondBackground: false,
};

// @TODO Add optimization
export default ContainerFullScreen;
