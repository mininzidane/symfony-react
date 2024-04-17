import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from '../useStyles';

function FacebookLogin({ label, isDisabled }) {
  const classes = useStyles();

  const targetParams = {
    target_path: window.location.pathname,
  };

  return (
    <a
      className={classnames(classes.button, 'is-facebook is-md ga-event-tracking js-track-event qa_facebook_button', {
        'is-disabled': isDisabled,
      })}
      href={RouterService.getRoute('facebookConnect', targetParams)}
      data-step="abm_registration"
      data-substep="register_with_fb_button_click"
      data-ga-event-name="FBClick"
      data-ga-event-category="Facebook Registration"
      data-ga-event-label="FBRegistration"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M20 10.0611C20 4.50451 15.5229 0 10 0C4.47715 0 0 4.50451 0 10.0611C0 15.0828 3.65684 19.2452 8.4375 20V12.9694H5.89844V10.0611H8.4375V7.84452C8.4375 5.32296 9.93047 3.93012 12.2146 3.93012C13.3088 3.93012 14.4531 4.12663 14.4531 4.12663V6.60261H13.1922C11.95 6.60261 11.5625 7.37822 11.5625 8.17387V10.0611H14.3359L13.8926 12.9694H11.5625V20C16.3432 19.2452 20 15.0828 20 10.0611Z"
          fill="#1877F2"
        />
      </svg>
      <span>{label}</span>
    </a>
  );
}

FacebookLogin.defaultProps = {
  label: 'Facebook',
  isDisabled: false,
};

FacebookLogin.propTypes = {
  label: PropTypes.node,
  isDisabled: PropTypes.bool,
};

export default FacebookLogin;
