import React from 'react';
import t from 'frontend/js/api/TranslatorService';
import Select from 'frontend/js/views/Shared/CountrySelect';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';

function CountrySelect() {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      {isAboveSm && <div className={classes.label}>{t('shared.label.country')}</div>}
      <Select className={classes.select} placement="top-start" />
    </div>
  );
}

export default CountrySelect;
