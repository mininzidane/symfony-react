import React from 'react';
import t from 'frontend/js/api/TranslatorService';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import ArrowTopSvg from './img/arrow-top.svg';
import useStyles from './useStyles';

function ToTopButton() {
  const classes = useStyles();

  return (
    <button type="button" className={classes.root} onClick={() => ScrollService.scrollToTop(true)}>
      {t('footer.controls.top')}
      <img src={ArrowTopSvg} alt="Arrow" width="18px" height="18px" />
    </button>
  );
}

export default ToTopButton;
