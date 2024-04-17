import { useState } from 'react';
import CountryService from 'frontend/js/api/CountryService';
import useEventListener from 'frontend/js/hooks/useEventListener';

function getInitialPosition(country) {
  const { COUNTRIES } = CountryService;

  if (country === COUNTRIES.belarus.iso2) {
    return { initialX: -90, initialY: 180 };
  }

  if (country === COUNTRIES.ukraine.iso2) {
    return { initialX: -100, initialY: 180 };
  }

  if (country === COUNTRIES.romania.iso2 || country === COUNTRIES.bulgaria.iso2) {
    return { initialX: -80, initialY: 170 };
  }

  if (country === COUNTRIES.albania.iso2) {
    return { initialX: -70, initialY: 160 };
  }

  if (country === COUNTRIES.georgia.iso2) {
    return { initialX: -150, initialY: 150 };
  }

  if (country === COUNTRIES.georgia.iso2) {
    return { initialX: -320, initialY: 160 };
  }

  if (country === COUNTRIES.southKorea.iso2) {
    return { initialX: -500, initialY: 140 };
  }

  if (country === COUNTRIES.nigeria.iso2) {
    return { initialX: 100, initialY: -70 };
  }

  if ([COUNTRIES.honduras.iso2, COUNTRIES.elSalvador.iso2, COUNTRIES.guatemala.iso2].includes(country)) {
    return { initialX: 570, initialY: 30 };
  }

  if (country === COUNTRIES.usa.iso2) {
    return { initialX: 600, initialY: 135 };
  }

  return { initialX: 0, initialY: 0 };
}

function useMapPosition(country, scale) {
  const { initialX, initialY } = getInitialPosition(country);
  const [shiftX, setShiftX] = useState(initialX);
  const [shiftY, setShiftY] = useState(initialY);
  const [previousTouch, setPreviousTouch] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [prevX, setPrevX] = useState();
  const [prevY, setPrevY] = useState();

  function handleMouseMove(e) {
    e.preventDefault();

    if (!isDragging) {
      return;
    }

    const movementX = prevX ? e.screenX - prevX : 0;
    const movementY = prevY ? e.screenY - prevY : 0;

    setShiftX(shiftX + movementX / scale);
    setShiftY(shiftY + movementY / scale);

    setPrevX(e.screenX);
    setPrevY(e.screenY);
  }

  function handleTouchMove(e) {
    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];

    if (previousTouch) {
      const movementX = touch.pageX - previousTouch.pageX;
      const movementY = touch.pageY - previousTouch.pageY;
      setShiftY(shiftY + movementY / scale);
      setShiftX(shiftX + movementX / scale);
    }

    setPreviousTouch(touch);
  }

  useEventListener('mouseup', () => {
    setIsDragging();
    setPrevX();
    setPrevY();
  });

  useEventListener('touchend', () => {
    setPreviousTouch(null);
  });

  return { shiftX, shiftY, handleMouseMove, handleTouchMove, isDragging, setIsDragging };
}

export default useMapPosition;
