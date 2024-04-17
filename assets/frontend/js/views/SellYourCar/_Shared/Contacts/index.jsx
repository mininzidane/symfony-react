import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import PhoneLink from 'frontend/js/components/PhoneLink';
import CompanyService from 'frontend/js/api/CompanyService';
import useStyles from './useStyles';

function Contacts({ className }) {
  const classes = useStyles();
  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.title}>
        <FormattedMessage
          id="sellYourCarPage.leadForm.contacts.title"
          values={{ phoneNumber: <PhoneLink className="ws-n" phone={CompanyService.sycPhone.formatted} /> }}
        />
      </div>
      <div className={classes.time}>
        <FormattedMessage id="sellYourCarPage.leadForm.contacts.time" />
      </div>
    </div>
  );
}

Contacts.propTypes = {
  className: PropTypes.string,
};

Contacts.defaultProps = {
  className: '',
};

export default Contacts;
