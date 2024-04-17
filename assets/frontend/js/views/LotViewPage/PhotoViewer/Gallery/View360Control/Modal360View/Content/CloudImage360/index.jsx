/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import useEventListener from 'frontend/js/hooks/useEventListener';
import calcDimensions from './calcDimensions';

function CloudImage360({ onInteract, urls }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const SLASH_SIGN = '/';
  const amount = urls.length - 1;
  const path = urls[0].url.split(SLASH_SIGN);
  const fileName = path.pop();
  const filePath = path.join(SLASH_SIGN) + SLASH_SIGN;
  const fileNameTemplate = fileName.replace('_0', '_{index}');

  function updateDimensions() {
    return setDimensions(calcDimensions());
  }

  useEventListener('resize', updateDimensions);

  useEffect(() => {
    updateDimensions();
  }, []);

  return (
    <div
      style={{ width: dimensions.width, height: dimensions.height }}
      onMouseDown={onInteract}
      onTouchStart={onInteract}
    >
      <div
        className="cloudimage-360"
        data-folder={filePath}
        data-filename={fileNameTemplate}
        data-amount={amount}
        data-magnifier="2"
        data-spin-reverse
        data-speed="300"
        data-ratio="0.75"
        data-draggable="false"
        data-autoplay="true"
      />
    </div>
  );
}

export default CloudImage360;
