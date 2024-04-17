import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useEventListener from 'frontend/js/hooks/useEventListener';

function OneLineText({ value, className }) {
  const ref = useRef();
  const initialFontSize = useRef(null);

  const fit = () => {
    const el = ref.current;

    if (initialFontSize.current) {
      el.style.fontSize = `${initialFontSize.current}px`;
    }

    function updateFontSize(lineHeight, fontSize) {
      const height = el.offsetHeight;

      if (height > lineHeight) {
        const nextFontSize = fontSize - 1;
        el.style.fontSize = `${nextFontSize}px`;

        updateFontSize(lineHeight, nextFontSize);
      } else {
        el.classList.remove('op-0');
      }
    }

    const styles = window.getComputedStyle(el, null);
    const fontSize = parseInt(styles.getPropertyValue('font-size'), 10);
    const lineHeight = parseInt(styles.getPropertyValue('line-height'), 10);

    if (!initialFontSize.current) {
      initialFontSize.current = fontSize;
    }

    updateFontSize(lineHeight, fontSize);
  };

  useEffect(fit, []);
  useEventListener('resize', fit);

  return (
    <span className={classNames('op-0', className)} ref={ref}>
      {value}
    </span>
  );
}

OneLineText.propTypes = {
  value: PropTypes.node,
  className: PropTypes.string,
};

OneLineText.defaultProps = {
  value: '',
  className: '',
};

export default OneLineText;
