const THRESHOLD = 10;
const TIMEOUT = 500;

function handleTouchEvents(el, onStart, onMove, onEnd, onSwipe) {
  let xDown = null;
  let yDown = null;
  let xDiff = null;
  let yDiff = null;
  let timeDown = null;
  let startEl = null;

  let moving = false;
  let ignore = false;

  function onTouchStart(e) {
    startEl = e.target;

    timeDown = performance.now();
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
    xDiff = 0;
    yDiff = 0;

    moving = false;
    ignore = false;

    onStart();
  }

  function onTouchMove(e) {
    if (ignore) {
      return;
    }
    if (!xDown || !yDown) {
      return;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    xDiff = xDown - xUp;
    yDiff = yDown - yUp;

    if (!moving && Math.abs(yDiff) > THRESHOLD) {
      ignore = true;
      return;
    }

    if (Math.abs(xDiff) > THRESHOLD || moving) {
      e.preventDefault();
      moving = true;

      onMove(xDiff);
    }
  }

  function onTouchEnd(e) {
    if (ignore) {
      return;
    }

    onEnd(xDiff);

    if (startEl !== e.target) {
      return;
    }

    const timeDiff = performance.now() - timeDown;

    if (timeDiff < TIMEOUT && Math.abs(xDiff) > Math.abs(yDiff)) {
      // most significant
      if (Math.abs(xDiff) > THRESHOLD) {
        if (xDiff > 0) {
          onSwipe('left');
        } else {
          onSwipe('right');
        }
      }
    }

    xDown = null;
    yDown = null;
    timeDown = null;

    moving = false;
    ignore = false;
  }

  el.addEventListener('touchstart', onTouchStart, { passive: true });
  el.addEventListener('touchmove', onTouchMove);
  el.addEventListener('touchend', onTouchEnd, { passive: true });

  return () => {
    el.removeEventListener('touchstart', onTouchStart);
    el.removeEventListener('touchmove', onTouchMove);
    el.removeEventListener('touchend', onTouchEnd);
  };
}

export default handleTouchEvents;
