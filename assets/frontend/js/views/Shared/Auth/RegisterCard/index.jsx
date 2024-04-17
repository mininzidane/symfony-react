import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RegisterView from 'frontend/js/views/Shared/Auth/RegisterView';
import useStyles from './useStyles';

function RegisterCard({ onSuccess, className, title, ctaText, footer, hasFooterLogin, channel, autoFocus, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)}>
      {title && <div className={classes.title}>{title}</div>}

      <RegisterView
        onSuccess={onSuccess}
        id="register-form-card"
        ctaText={ctaText}
        withoutPadding
        withoutBg
        withoutSignIn={!hasFooterLogin}
        channel={channel}
        autoFocus={autoFocus}
      />

      {footer && <div>{footer}</div>}
    </div>
  );
}

RegisterCard.defaultProps = {
  className: '',
  ctaText: '',
  title: '',
  footer: '',
  hasFooterLogin: false,
  channel: null,
  autoFocus: true,
};

RegisterCard.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  className: PropTypes.string,
  hasFooterLogin: PropTypes.bool,
  autoFocus: PropTypes.bool,
  ctaText: PropTypes.string,
  title: PropTypes.node,
  footer: PropTypes.node,
  channel: PropTypes.number,
};

export default RegisterCard;
