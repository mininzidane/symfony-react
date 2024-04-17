import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';

import ForgotPasswordLayout from '../../_Shared/ForgotPasswordLayout';
import useStyles from './useStyles';

function SuccessState({ sendedEmail, onSignInClick }) {
  const classes = useStyles();
  const intl = useIntl();

  const translations = {
    title: intl.formatMessage({ id: 'forgotPasswordPage.success.title' }),
    backBtn: intl.formatMessage({ id: 'authComponents.forgotPassword.back' }),
    subtitle: intl.formatMessage(
      { id: 'forgotPasswordPage.success.subtitle' },
      {
        br: <br />,
        email: sendedEmail,
        b: (chunks) => <b>{chunks}</b>,
        againLink: (chunks) => (
          <Link href={RouterService.getRoute('forgottenPassword')}>
            <b>{chunks}</b>
          </Link>
        ),
        supportLink: (chunks) => (
          <Link href={RouterService.getRoute('contactUs')}>
            <b>{chunks}</b>
          </Link>
        ),
      },
    ),
  };

  return (
    <ForgotPasswordLayout title={translations.title} subtitle={translations.subtitle}>
      <Button type="button" label={translations.backBtn} className={classes.backBtn} onClick={onSignInClick} />
    </ForgotPasswordLayout>
  );
}

SuccessState.propTypes = {
  onSignInClick: PropTypes.func,
  sendedEmail: PropTypes.string.isRequired,
};

SuccessState.defaultProps = {
  onSignInClick: () => {
    RouterService.redirect('login');
  },
};

export default SuccessState;
