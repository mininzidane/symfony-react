import React from 'react';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import useStyles from './useStyles';

function Form() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ChangeEmail />
      <ChangePassword />
    </div>
  );
}

export default Form;
