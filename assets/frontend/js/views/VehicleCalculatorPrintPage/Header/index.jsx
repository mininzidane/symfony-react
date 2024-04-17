import React from 'react';
import AbmLogoSvg from 'frontend/images/shared/logo/abm-logo-blue.svg';
import CompanyService from 'frontend/js/api/CompanyService';
import CountryService from 'frontend/js/api/CountryService';
import CallSvg from 'frontend/images/shared/support/call.svg';
import EmailSvg from 'frontend/images/shared/support/email.svg';
import useStyles from './useStyles';

function Header() {
  const classes = useStyles();
  const userCountryIso2 = CountryService.getUserCountryIso2();
  const { officePhone, email } = CompanyService;

  let contactPhone = officePhone;
  let contactEmail = email;
  if (CompanyService[userCountryIso2]) {
    contactPhone = CompanyService[userCountryIso2].phone;
    contactEmail = CompanyService[userCountryIso2].email;
  }

  return (
    <div className={classes.root}>
      <img className={classes.logo} src={AbmLogoSvg} alt="AutoBidMaster" width="162" height="45" />

      <div className={classes.item}>
        <img src={CallSvg} alt="Phone" width="23px" height="22px" />
        <span>{contactPhone.formatted}</span>
      </div>

      <div className={classes.item}>
        <img src={EmailSvg} alt="Email" width="23px" height="22px" />
        <span>{contactEmail.raw}</span>
      </div>
    </div>
  );
}

export default Header;
