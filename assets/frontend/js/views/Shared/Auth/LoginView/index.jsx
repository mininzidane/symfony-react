import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';

import Form from './Form';
import useStyles from './useStyles';
import SocialLoginButtons from '../_Shared/SocialLoginButtons';
import OrSeparator from '../_Shared/OrSeparator';

function LoginView({ title, subtitle, onSuccess, onForgotPasswordClick, onRegisterNowClick, className }) {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  function handleSuccess(...args) {
    onSuccess(...args);
    setIsDisabled(true);
  }

  function handleRegisterLinkClick(e) {
    onRegisterNowClick(e);
    RouterService.redirect('register');
  }

  return (
    <div className={classnames(classes.root, className)}>
      <h1 className={classes.title}>{title}</h1>
      {subtitle && <h2 className={classes.subtitle}>{subtitle}</h2>}
      <Form
        onSuccess={handleSuccess}
        onForgotPasswordClick={onForgotPasswordClick}
        setIsSubmitting={setIsSubmitting}
        isDisabled={isDisabled}
      />
      <OrSeparator />
      <SocialLoginButtons isDisabled={isSubmitting || isDisabled} />

      <div className={classes.registerLinkContainer}>
        <FormattedMessage id="loginPage.catchword" />
        &nbsp;
        <Link
          href={RouterService.getRoute('register')}
          onMouseDown={handleRegisterLinkClick}
          className={classes.registerLink}
        >
          <FormattedMessage id="loginPage.label.registerNow" />
        </Link>
      </div>
    </div>
  );
}

LoginView.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  onForgotPasswordClick: PropTypes.func,
  onRegisterNowClick: PropTypes.func,
};

LoginView.defaultProps = {
  subtitle: '',
  className: '',
  onForgotPasswordClick: () => {},
  onRegisterNowClick: () => {},
};

export default LoginView;
