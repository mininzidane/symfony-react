import React from 'react';
import t from 'frontend/js/api/TranslatorService';
import Select from 'frontend/js/views/Shared/LanguageSelect';
import LanguageService from 'frontend/js/api/LanguageService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';

function LanguageSelect() {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  if (LanguageService.OPTIONS.length <= 1) {
    return null;
  }

  return (
    <div className={classes.root}>
      {isAboveSm && <div className={classes.label}>{t('shared.label.language')}</div>}
      <Select className={classes.select} isFullLabel placement="top-start" />
    </div>
  );
}

export default LanguageSelect;
