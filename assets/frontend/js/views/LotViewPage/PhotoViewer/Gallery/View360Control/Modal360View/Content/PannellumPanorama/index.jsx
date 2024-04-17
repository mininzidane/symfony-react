/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ReactPannellum from 'react-pannellum';
import useEventListener from 'frontend/js/hooks/useEventListener';
import calcDimensions from './calcDimensions';

function PannellumPanorama({ isShown, url }) {
  if (!isShown) {
    return null;
  }

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  function updateDimensions() {
    return setDimensions(calcDimensions());
  }

  useEventListener('resize', updateDimensions);

  useEffect(() => {
    updateDimensions();
  }, []);

  return (
    <ReactPannellum
      id="1"
      sceneId="firstScene"
      imageSource={url}
      showFullscreenCtrl
      config={{
        autoLoad: true,
        compass: true,
      }}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    />
  );
}

export default PannellumPanorama;
