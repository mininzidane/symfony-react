import React from 'react';
import Select from 'frontend/js/views/Shared/LanguageSelect';

import useStyles from './useStyles';

function LanguageSelect() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Select
        className={classes.select}
        classes={{
          icon: classes.icon,
          label: classes.label,
        }}
        placement="bottom-end"
      />
    </div>
  );
}

export default LanguageSelect;
