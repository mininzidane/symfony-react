/* eslint-disable react/prop-types */
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useContactPhone from 'frontend/js/hooks/useContactPhone';
import HeadphonesSvg from 'frontend/images/shared/various/headphones.svg';
import useStyles from './useStyles';

function Phone() {
  const classes = useStyles();
  const isMdBreakpoint = useMediaQuery((theme) => theme.breakpoints.only('md'));
  const { isAuthenticated } = useCustomerHelper();
  const ga = new GoogleAnalyticsService();
  const phoneNumber = useContactPhone();

  function handlePhoneLinkClick() {
    if (!isAuthenticated) {
      ga.sendEvent('click', 'contact', 'contactus');
    }
  }

  return (
    <a href={`tel:${phoneNumber}`} className={classes.root} onClick={handlePhoneLinkClick}>
      <img width="12" height="16" src={HeadphonesSvg} className={classes.icon} alt="Phone" />
      {!isMdBreakpoint && <span>{phoneNumber}</span>}
    </a>
  );
}

export default Phone;
