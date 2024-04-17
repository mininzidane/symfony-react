import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

const LENS_RATIO = 4;

function Zoom({ image, elementId }) {
  const classes = useStyles();
  const rootRef = useRef();
  const resultRef = useRef();
  const imgRef = useRef();
  const lensRef = useRef();

  function setDimensions() {
    const el = document.getElementById(elementId);
    const rect = el.getBoundingClientRect();
    let maxWidth = window.innerWidth - rect.right - 40;
    let maxHeight = window.innerHeight - rect.top - 10;
    if (maxHeight < maxWidth * 0.75) {
      maxWidth = maxHeight * 1.25;
    } else {
      maxHeight = maxWidth * 0.75;
    }
    resultRef.current.style.width = `${maxWidth}px`;
    resultRef.current.style.height = `${maxHeight}px`;

    lensRef.current.style.width = `${el.offsetWidth / LENS_RATIO}px`;
    lensRef.current.style.height = `${el.offsetHeight / LENS_RATIO}px`;

    const ratio = resultRef.current.offsetWidth / lensRef.current.offsetWidth;
    imgRef.current.style.width = `${el.offsetWidth * ratio}px`;
    imgRef.current.style.height = `${el.offsetHeight * ratio}px`;
  }

  function getCursorPosition(e) {
    let x;
    let y;
    const el = document.getElementById(elementId);
    const img = el.getBoundingClientRect();
    x = e.pageX - img.left;
    y = e.pageY - img.top;
    x -= window.pageXOffset;
    y -= window.pageYOffset;
    return { x, y };
  }

  function getBoundedPosition(e) {
    const pos = getCursorPosition(e);
    const el = document.getElementById(elementId);
    const lensEl = lensRef.current;

    let x = pos.x - lensEl.offsetWidth / 2;
    let y = pos.y - lensEl.offsetHeight / 2;

    if (x > el.offsetWidth - lensEl.offsetWidth) {
      x = el.offsetWidth - lensEl.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > el.offsetHeight - lensEl.offsetHeight) {
      y = el.offsetHeight - lensEl.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    return { x, y };
  }

  function handleMouseOver() {
    setDimensions();

    rootRef.current.classList.add(classes.visible);
  }

  function handleMouseLeave() {
    rootRef.current.classList.remove(classes.visible);
  }

  function handleMouseMove(e) {
    const ratio = resultRef.current.offsetWidth / lensRef.current.offsetWidth;

    const { x, y } = getBoundedPosition(e);

    lensRef.current.style.left = `${x}px`;
    lensRef.current.style.top = `${y}px`;

    imgRef.current.style.transform = `translate(-${x * ratio}px, -${y * ratio}px)`;
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const el = document.getElementById(elementId);

    if (el) {
      setDimensions();

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return ReactDOM.createPortal(
    <div className={classes.root} ref={rootRef}>
      <div className={classes.result} ref={resultRef}>
        <img src={image} alt="" ref={imgRef} />
      </div>

      <div className={classes.lens} ref={lensRef}>
        <svg className="centered" width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.49 17.49">
          <g id="ic_zoom_in_black_24px" transform="translate(-3 -3)">
            <path
              fill="#fff"
              d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
            />
            <path fill="#fff" d="M12,10H10v2H9V10H7V9H9V7h1V9h2Z" />
          </g>
        </svg>
      </div>
    </div>,
    document.getElementById(elementId),
  );
}

Zoom.propTypes = {
  elementId: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
};

export default Zoom;
