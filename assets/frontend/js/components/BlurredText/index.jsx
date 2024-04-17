import React from 'react';
import PropTypes from 'prop-types';

function BlurredText({ text, width, height, fontColor, fontSize, fontWeight, blurAmount }) {
  return (
    <svg className="blurred-text" width={width} height={height}>
      <defs>
        <filter id="svgBlur" x="-10%" y="10%" width="110%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} result="blur" />
        </filter>
      </defs>
      <text x="0" y={fontSize} fill={fontColor} fontSize={fontSize} fontWeight={fontWeight} filter="url(#svgBlur)">
        {text}
      </text>
    </svg>
  );
}

BlurredText.defaultProps = {
  fontColor: '#000',
  fontSize: 16,
  fontWeight: 'normal',
  height: 16,
  blurAmount: 1,
};

BlurredText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontColor: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  blurAmount: PropTypes.number,
};

export default BlurredText;
