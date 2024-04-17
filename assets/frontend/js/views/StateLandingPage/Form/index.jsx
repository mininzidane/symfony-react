import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import FacebookPixelService from 'frontend/js/api/FacebookPixelService';
import RegisterView from 'frontend/js/views/Shared/Auth/RegisterView';
import useStyles from './useStyles';

function Form({ className }) {
  const classes = useStyles();
  const facebookPixelService = new FacebookPixelService();

  return (
    <div className={classNames(classes.root, className)}>
      <RegisterView
        title={<FormattedMessage id="stateLandingPage.form.join_now_to_start_bidding" />}
        onSuccess={() => {
          facebookPixelService.track('CompleteRegistration');
          RouterService.customRedirect(RouterService.getFullRoute('registerCongrats'));
        }}
      />
    </div>
  );
}

Form.propTypes = {
  className: PropTypes.string,
};

Form.defaultProps = {
  className: '',
};

export default Form;
