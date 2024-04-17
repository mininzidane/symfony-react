import React from 'react';
import Button from 'frontend/js/components/Button';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';
import IcMembershipSvg from './img/ic_membership.svg';

function LoginSection() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={IcMembershipSvg} alt="Icon" />
      <div className={classes.text}>
        <FormattedMessage id="trackingPage.trackingInformation.tooltip.signIn" />
      </div>
      <Button
        className={classes.button}
        onClick={() => window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { tab: 'signIn' } }))}
        label={<FormattedMessage id="shared.access.signIn" />}
        isInline
      />
    </div>
  );
}

LoginSection.propTypes = {};

export default LoginSection;
