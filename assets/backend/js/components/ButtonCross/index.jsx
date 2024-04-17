import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BlackSvg from './img/cross-black-10x10.svg';
import WhiteSvg from './img/cross-white-16x16.svg';
import BlackThinSvg from './img/cross-thin-10x10.svg';
import WhiteThinSvg from './img/cross-thin-white-10x10.svg';

function ButtonCross({ onClick, color, isThin, size, className, isExtraHitbox, alt, style }) {
  const buttonClasses = classNames(className, { 'has-extra-hitbox': isExtraHitbox });
  let url = BlackSvg;

  if (color === 'white') {
    if (isThin) {
      url = WhiteThinSvg;
    } else {
      url = WhiteSvg;
    }
  } else if (isThin) {
    url = BlackThinSvg;
  }

  return (
    <button type="button" onClick={onClick} className={buttonClasses} style={{ width: size, height: size, ...style }}>
      <img width={size} height={size} src={url} alt={alt} style={{ display: 'block' }} />
    </button>
  );
}

ButtonCross.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  isThin: PropTypes.bool,
  isExtraHitbox: PropTypes.bool,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ButtonCross.defaultProps = {
  onClick: () => {},
  color: 'black',
  className: '',
  alt: 'Close',
  isThin: false,
  isExtraHitbox: true,
  size: 10,
  style: {},
};

export default ButtonCross;
