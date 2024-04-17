import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import RegisterFormInputs from 'frontend/js/views/Shared/Auth/_Shared/RegisterForm/Inputs';
import RegisterFormContext from 'frontend/js/views/Shared/Auth/_Shared/RegisterForm/Form';
import RegisterFormSubmitButton from 'frontend/js/views/Shared/Auth/_Shared/RegisterForm/SubmitButton';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import SocialLoginButtons from '../_Shared/SocialLoginButtons';
import OrSeparator from '../_Shared/OrSeparator';
import TermsAgreement from '../_Shared/TermsAgreement';
import useStyles from './useStyles';

function RegisterView({
  title,
  subtitle,
  onSuccess,
  onSignInClick,
  className,
  withoutPadding,
  withoutBg,
  withoutSignIn,
  channel,
  autoFocus,
  isPhoneNumberShown,
  hasExtraItems,
}) {
  const classes = useStyles();
  const intl = useIntl();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ctaLabel = intl.formatMessage({ id: 'shared.access.registerNow' });

  function handleSignInClick(e) {
    if (onSignInClick) {
      onSignInClick(e);
    } else {
      RouterService.redirect('login');
    }
  }

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.rootWithPadding]: hasExtraItems && !withoutPadding,
          [classes.rootWithBg]: !withoutBg,
        },
        className,
      )}
    >
      {title ? (
        <h1 className={classnames(classes.title, 'qa_register_or_sing_in_title')}>{title}</h1>
      ) : (
        <div className={classes.spacer} />
      )}
      {subtitle && <h2 className={classes.subtitle}>{subtitle}</h2>}

      <SocialLoginButtons isDisabled={isSubmitting} />

      <OrSeparator />

      <RegisterFormContext onSuccess={onSuccess} channel={channel} setIsSubmitting={setIsSubmitting}>
        <RegisterFormInputs className={classes.inputs} autoFocus={autoFocus} isPhoneNumberShown={isPhoneNumberShown} />
        {hasExtraItems && <TermsAgreement ctaLabel={ctaLabel} />}

        <RegisterFormSubmitButton
          label={ctaLabel}
          className={classnames('js-track-event qa_registration_button', classes.submitBtn)}
          data-step="abm_registration"
          data-substep="register_now_button_click"
        />
      </RegisterFormContext>

      {hasExtraItems && !withoutSignIn && (
        <div className={classes.signInLinkContainer}>
          <FormattedMessage id="shared.access.alreadyMember" />{' '}
          <Link className={classes.signInLink} href={RouterService.getRoute('login')} onMouseDown={handleSignInClick}>
            <FormattedMessage id="shared.access.signIn" />
          </Link>
        </div>
      )}
    </div>
  );
}

RegisterView.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func,
  className: PropTypes.string,
  hasExtraItems: PropTypes.bool,
  withoutPadding: PropTypes.bool,
  withoutBg: PropTypes.bool,
  withoutSignIn: PropTypes.bool,
  channel: PropTypes.number,
  autoFocus: PropTypes.bool,
  isPhoneNumberShown: PropTypes.bool,
};

RegisterView.defaultProps = {
  title: '',
  subtitle: '',
  onSignInClick: () => {},
  className: '',
  hasExtraItems: true,
  withoutPadding: false,
  withoutBg: false,
  withoutSignIn: false,
  channel: null,
  autoFocus: true,
  isPhoneNumberShown: undefined,
};

export default RegisterView;
