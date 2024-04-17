import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';

function SlideDown({ children, in: inProp, delay }) {
  const [isShown, setIsShown] = useState(inProp);

  useEffect(() => {
    let idTimeout;
    if (inProp !== isShown && inProp) {
      idTimeout = setTimeout(() => {
        setIsShown(true);
      }, delay);
    }
    return () => {
      clearTimeout(idTimeout);
    };
  }, [inProp]);

  return <Collapse in={isShown}>{children}</Collapse>;
}

SlideDown.propTypes = {
  children: PropTypes.node.isRequired,
  in: PropTypes.bool.isRequired,
  delay: PropTypes.number,
};

SlideDown.defaultProps = {
  delay: 0,
};

export default SlideDown;
