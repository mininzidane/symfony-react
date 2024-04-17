import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import CompanyService from 'frontend/js/api/CompanyService';
import EnvelopeSvg from 'frontend/images/shared/various/envelope.svg';
import PhoneSvg from 'frontend/images/shared/various/phone.svg';
import useStyles from './useStyles';

function Contact({ className }) {
  const classes = useStyles();
  const { email, officePhone } = CompanyService;
  return (
    <div className={classnames(classes.root, className)}>
      <div>
        <FormattedMessage id="internationalAutoShippingPage.shippingInformation.contact.desc" />
      </div>
      <div className={classes.email}>
        <img src={EnvelopeSvg} alt="Email" className={classes.icon} />
        <a href={email.href}>{email.raw}</a>
      </div>
      <div className={classes.phone}>
        <img src={PhoneSvg} alt="Phone" className={classes.icon} />
        <a href={officePhone.href}>{officePhone.formatted}</a>
      </div>
    </div>
  );
}

Contact.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Contact;
