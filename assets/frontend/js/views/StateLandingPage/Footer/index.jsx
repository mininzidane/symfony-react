import React from 'react';
import CompanyService from 'frontend/js/api/CompanyService';
import Container from 'frontend/js/components/Container';
import PhoneLink from 'frontend/js/components/PhoneLink';
import Copyright from 'frontend/js/views/Shared/Copyright';
import useStyles from './useStyles';
import Partners from './Partners';

function Footer() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.partners}>
        <Container>
          <Partners className="jc-ct" />
        </Container>
      </div>
      <div className={classes.copyrightAndContacts}>
        <Container>
          <div>
            <Copyright />
          </div>
          <div className={classes.contacts}>
            Customer Service <PhoneLink phone={CompanyService.officePhone.formatted} />
            <span className={classes.dot}>•</span>
            <br />
            {CompanyService.officeHours.label}
            <span className={classes.dot}>•</span>
            <br />
            {CompanyService.address.companyName} {CompanyService.address.street}, {CompanyService.address.city},{' '}
            {CompanyService.address.state} {CompanyService.address.zip} {CompanyService.address.country}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Footer;
