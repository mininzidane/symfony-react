/* eslint-disable react/prop-types */
import React from 'react';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import PhoneLink from 'frontend/js/components/PhoneLink';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useStyles from './useStyles';

function InventoryTooltip({ saleLocation }) {
  const classes = useStyles();
  const officeLocations = OfficeLocationsService.getOfficeLocations();

  const location = officeLocations.find((office) => office.country.iso_3 === saleLocation.countryCode);

  return (
    <span>
      <TooltipOnHover
        maxWidth={380}
        badgeTop={-1}
        isFlipEnabled={false}
        triggerClassName={classes.tooltipTrigger}
        content={
          <>
            <FormattedMessage
              id="lotPage.vehiclePrice.abmInventoryTooltip"
              values={{
                phone: <PhoneLink phone={location?.phoneNumber} />,
                buyItNow: <FormattedMessage id="shared.cta.buyItNow" />,
              }}
            />
          </>
        }
      />
    </span>
  );
}

export default InventoryTooltip;
