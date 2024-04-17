import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import CompanyService from 'frontend/js/api/CompanyService';
import PhoneLink from 'frontend/js/components/PhoneLink';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import UserLocationService from 'frontend/js/api/UserLocationService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useStyles from './useStyles';

function ExplanationContent() {
  const classes = useStyles();
  function redirectToShippingInfoPage() {
    const userLocationService = new UserLocationService();
    const customerLocation = userLocationService.getUserLocation();
    const isUSCustomer = customerLocation && customerLocation.country_code === ShippingOrderService.CountryCodeUS;

    if (isUSCustomer) {
      RouterService.redirect('domesticVehicleTransportation');
    } else {
      RouterService.redirect('internationalShipping');
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage id="lotPage.shipping.explanation.title" />
      </div>
      <div className="mt-10">
        <FormattedMessage id="lotPage.shipping.explanation.description" />
      </div>

      <div className="mt-10 pt-2 pb-2">
        <div>
          • <FormattedMessage id="lotPage.shipping.explanation.point1" />
        </div>
        <div>
          • <FormattedMessage id="lotPage.shipping.explanation.point2" />
        </div>
        <div>
          • <FormattedMessage id="lotPage.shipping.explanation.point3" />
        </div>
        <div>
          • <FormattedMessage id="lotPage.shipping.explanation.point4" />
        </div>
      </div>

      <div className="mt-10">
        <FormattedMessage
          id="lotPage.shipping.explanation.footer"
          values={{
            WonLotsLink: (chunks) => <Link href={RouterService.getRoute('lotsWon')}>{chunks}</Link>,
            ShippingInfoLink: (chunks) => <ButtonLink onClick={redirectToShippingInfoPage} label={chunks} />,
            phone: <PhoneLink phone={CompanyService.officePhone.formatted} />,
          }}
        />
      </div>
    </div>
  );
}

export default ExplanationContent;
