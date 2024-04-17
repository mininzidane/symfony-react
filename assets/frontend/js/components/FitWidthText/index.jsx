import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useEventListener from 'frontend/js/hooks/useEventListener';

function FitWidthText({ value, className }) {
  const ref = useRef();

  const fit = () => {
    const el = ref.current;

    function updateFontSize(maxWidthPx, fontSize) {
      const width = el.offsetWidth;

      if (width > maxWidthPx) {
        const nextFontSize = fontSize - 1;
        el.style.fontSize = `${nextFontSize}px`;

        updateFontSize(maxWidthPx, nextFontSize);
      } else {
        el.classList.remove('op-0');
      }
    }

    const styles = window.getComputedStyle(el, null);
    const fontSize = parseInt(styles.getPropertyValue('font-size'), 10);
    const maxWidthPx = el.parentElement.offsetWidth;

    updateFontSize(maxWidthPx, fontSize);
  };

  useEffect(fit, [value]);
  useEventListener('resize', fit);

  return (
    <span className={classNames('op-0', className)} ref={ref}>
      {value}
    </span>
  );
}

FitWidthText.propTypes = {
  value: PropTypes.node,
  className: PropTypes.string,
};

FitWidthText.defaultProps = {
  value: '',
  className: '',
};

export default FitWidthText;
