import React from 'react';
import CountryService from 'frontend/js/api/CountryService';
import CompanyService from 'frontend/js/api/CompanyService';
import useIntl from 'frontend/js/hooks/useIntl';
import Link from 'frontend/js/components/Link';
import StringService from 'frontend/js/lib/utils/StringService';
import useOfficeData from 'frontend/js/hooks/useOfficeData';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';

function Support() {
  const classes = useStyles();
  const intl = useIntl();
  const { phoneNumber, socialContacts } = useOfficeData();
  const { email } = socialContacts || {};
  const emailHref = CountryService.isDomestic() ? CompanyService.emailIntl.href : `mailto:${email}`;
  const { isAboveSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      <Link href={StringService.getPhoneHref(phoneNumber)} className={classes.phone}>
        {isAboveSm &&
          intl.formatMessage({
            id: 'checkoutIntlShippingPage.label.needHelp',
          })}
        &nbsp;
        <strong>{phoneNumber}</strong>
      </Link>
      {isAboveSm && (
        <Link href={emailHref} className={classes.contact}>
          <span>{intl.formatMessage({ id: 'checkoutIntlShippingPage.label.sendMessage' })}</span>
        </Link>
      )}
    </div>
  );
}

export default Support;
