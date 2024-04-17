import React from 'react';
import PropTypes from 'prop-types';

function BlurredImage({ imageSrc, width, height, blurAmount }) {
  return (
    <svg className="blurred-image" width={width} height={height}>
      <defs>
        <filter id="svgImageBlur" x="-10%" y="10%" width="110%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} result="blur" />
        </filter>
      </defs>
      <image xlinkHref={imageSrc} width={width} height={height} x={0} y={0} filter="url(#svgImageBlur)" />
    </svg>
  );
}

BlurredImage.defaultProps = {
  blurAmount: 1,
};

BlurredImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  blurAmount: PropTypes.number,
};

export default BlurredImage;
