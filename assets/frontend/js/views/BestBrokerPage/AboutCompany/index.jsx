import React from 'react';
import CompanyService from 'frontend/js/api/CompanyService';
import useStyles from './useStyles';

function AboutCompany() {
  const classes = useStyles();
  const { officePhone, address } = CompanyService;
  return (
    <div className={classes.root}>
      <div>
        <ul className={classes.list}>
          <li>Over 100,000 Vehicles at Auction</li>
          <li>Certified Copart Broker</li>
          <li>No Dealer License Needed</li>
          <li>No Bidding Limitations</li>
          <li>Superior Support by Phone and Email</li>
        </ul>
      </div>
      <div>
        <strong>Phone</strong>
        <br />
        {officePhone.formatted}
        <br />
        <br />
        <strong>Address</strong>
        <br />
        {address.street}
        <br />
        {address.city}, {address.state} {address.zip} {address.country}
      </div>
    </div>
  );
}

export default AboutCompany;
