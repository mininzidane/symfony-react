import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Zoom from '@material-ui/core/Zoom';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import useEventListener from 'frontend/js/hooks/useEventListener';
import ArrowTopSvg from './img/arrow-top.svg';
import useStyles from './useStyles';

function ScrollBackButton() {
  const { isBelowSm } = useBreakpoint();
  const classes = useStyles();

  const [isShown, setShown] = useState(false);
  const visibilityThreshold = 100;

  function updateButtonState() {
    const maxY = window.scrollMaxY || document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const offset = window.pageYOffset;

    setShown(offset >= visibilityThreshold && offset <= maxY - 178);
  }

  function clickHandler() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  useEventListener('scroll', updateButtonState);

  if (isBelowSm) {
    return null;
  }

  return (
    <Zoom in={isShown}>
      <button type="button" className={classes.root} onClick={clickHandler} id="scroll-back-button">
        <img src={ArrowTopSvg} width="10" alt="Back to page top" />
      </button>
    </Zoom>
  );
}
const $el = document.getElementById('scroll-back-button');

if ($el) {
  ReactDOM.render(
    <ThemeProvider>
      <ScrollBackButton />
    </ThemeProvider>,
    $el,
  );
}

export default ScrollBackButton;
