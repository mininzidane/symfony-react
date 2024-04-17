import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import get from 'lodash/get';
import Alert from 'frontend/js/views/Shared/Alert';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import RouterService from 'frontend/js/api/RouterService';
import LocationService from 'frontend/js/api/LocationService';
import Link from 'frontend/js/components/Link';
import ABMLogoFlag from 'frontend/images/shared/logo/abm_logo_flag.svg';

function DashboardAlert({ location }) {
  const { isAuthenticated } = useCustomerHelper(window.customer);

  if (!isAuthenticated) {
    return (
      <Alert
        type="error"
        content={
          <FormattedMessage
            id="joinAuctions.alert.unauthenticated"
            values={{
              a: (chunks) => (
                <Link href={RouterService.getRoute('login', { return_to: window.location.pathname })}>{chunks}</Link>
              ),
            }}
          />
        }
      />
    );
  }

  if (window.customer && window.customer.status !== 'A') {
    return (
      <Alert
        type="error"
        content={
          <FormattedMessage
            id="joinAuctions.alert.blocked"
            values={{
              a: (chunks) => <Link href={RouterService.getRoute('contactUs')}>{chunks}</Link>,
            }}
          />
        }
      />
    );
  }

  if (location && location.stateLiveRestricted) {
    return (
      <Alert
        type="error"
        content={
          <FormattedMessage
            id="joinAuctions.alert.restricted"
            values={{
              state: location.stateCode,
              br: <br />,
            }}
          />
        }
      />
    );
  }

  const customerStateCode = get(window.customer, 'state.code');
  const isCA2CA =
    location &&
    location.stateCode === LocationService.STATE_CODE_CALIFORNIA &&
    customerStateCode === LocationService.STATE_CODE_CALIFORNIA;
  if (isCA2CA) {
    return (
      <Alert
        content={
          <FormattedMessage
            id="shared.ca2ca"
            values={{
              a: (chunks) => (
                <Link href={RouterService.getLocalizedHcRoute('hcCanIBuyCa2Ca')} isTargetBlank>
                  {chunks}
                </Link>
              ),
            }}
          />
        }
      />
    );
  }

  const isScheduleAcustomer = get(window.customer, 'scheduleA');
  const isScheduleA2Ccustomer = get(window.customer, 'scheduleA2C');

  return (
    <Alert
      content={
        <FormattedMessage
          id="joinAuctions.alert.info"
          values={{
            isAbmNamedBid: isScheduleAcustomer || isScheduleA2Ccustomer,
            g: (chunks) => <span className="text-green fw-7">{chunks}</span>,
            r: (chunks) => <span className="text-red fw-7">{chunks}</span>,
            nowrap: (chunks) => <span className="d-ib">{chunks}</span>,
            icon: <img className="va-m" src={ABMLogoFlag} alt="ABM Logo" style={{ width: 30, height: 24 }} />,
          }}
        />
      }
    />
  );
}

DashboardAlert.defaultProps = {
  location: {},
};

DashboardAlert.propTypes = {
  location: PropTypes.shape({
    stateCode: PropTypes.string,
    stateLiveRestricted: PropTypes.bool,
  }),
};

export default DashboardAlert;
