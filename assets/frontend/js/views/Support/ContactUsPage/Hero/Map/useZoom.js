import { useState } from 'react';

function useZoom() {
  const MAX_ZOOM = 3;
  const MIN_ZOOM = -2;
  const ZOOM_FACTOR = 1.5;
  const [zoom, setZoom] = useState(0);

  function handleZoomUpdate(isIncrease) {
    const nextZoom = zoom + (isIncrease ? 1 : -1);
    const updatedZoom = nextZoom > 0 ? Math.min(MAX_ZOOM, nextZoom) : Math.max(MIN_ZOOM, nextZoom);
    setZoom(updatedZoom);
  }

  function getScale() {
    if (zoom > 0) {
      return ZOOM_FACTOR ** zoom;
    }

    if (zoom < 0) {
      return 1 / ZOOM_FACTOR ** Math.abs(zoom);
    }

    return 1;
  }

  return {
    zoom,
    scale: getScale(),
    handleZoomUpdate,
    isZoomInDisabled: zoom >= MAX_ZOOM,
    isZoomOutDisabled: zoom <= MIN_ZOOM,
  };
}

export default useZoom;
