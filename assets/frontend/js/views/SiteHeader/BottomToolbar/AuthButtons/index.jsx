import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useStyles from '../useStyles';

function AuthButtons() {
  const classes = useStyles();

  return (
    <div id="header-auth-buttons" className={classes.root}>
      <div className={classes.authButtons}>
        <ButtonOutlined
          href={RouterService.getRoute('login')}
          size="sm"
          label={<FormattedMessage id="shared.access.signIn" />}
          className="qa_sign_in_button"
          isRegularCase
          style={{ minHeight: 36 }}
        />
        <Button
          href={RouterService.getRoute('register')}
          color="yellow"
          size="sm"
          label={<FormattedMessage id="shared.access.registerNow" />}
          className="qa_register_button"
          isRegularCase
          style={{ minHeight: 36 }}
        />
      </div>
    </div>
  );
}

export default AuthButtons;
