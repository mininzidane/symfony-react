/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import get from 'lodash/get';
import classnames from 'classnames';
import ContentPopover from 'frontend/js/components/ContentPopover';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import ButtonLink from 'frontend/js/components/ButtonLink';
import LocationService from 'frontend/js/api/LocationService';
import ShippingAddressForm from './ShippingAddressForm';
import useSelectedDestination from '../useSelectedDestination';
import useSelectedCountry from '../useSelectedCountry';
import useStyles from './useStyles';

function ShippingTo({ onChange, triggerClassName }) {
  const classes = useStyles();
  const { shippingStateCode, shippingCity, shippingZip, shippingQuote, isDomestic, isBorderCrossing } =
    useContext(ShippingQuoteContext);
  const destination = useSelectedDestination();
  const country = useSelectedCountry();

  function getLabel() {
    const { city, state_code, zip } = get(shippingQuote, 'destination.zip', {
      city: shippingCity,
      state_code: shippingStateCode,
      zip: shippingZip,
    });

    if (isDomestic() && city && state_code && zip) {
      return LocationService.formatCityStateZip(city, state_code, zip);
    }

    const { name: destinationName, country: { iso_2: countryCode } = {} } = get(shippingQuote, 'destination', {
      name: destination && destination.name,
      country: { iso_2: country && country.iso_2 },
    });

    if (isBorderCrossing() && destinationName) {
      return destinationName;
    }

    if (!isDomestic() && destinationName && countryCode) {
      return `${destinationName}, ${countryCode}`;
    }

    return <FormattedMessage id="shared.label.notSet" />;
  }

  return (
    <ContentPopover
      popoverClass={classes.popover}
      trigger={
        <ButtonLink
          label={getLabel()}
          isDashed
          className={classnames(triggerClassName, 'js-track-event')}
          data-step="abm_shipping"
          data-substep="shipping_to_link_clicked"
        />
      }
      popoverTitle={<FormattedMessage id="shared.label.shippingAddress" />}
      isInline
    >
      {({ close }) => (
        <>
          <div className="text-md text-gray pr-50 mb-15">
            <FormattedMessage id="lotPage.shipping.shippingTo.description" />
          </div>
          <div className="grid-x ai-ct mb-15 text-sm">
            <div className="svg-icon mr-5" style={{ width: 9, height: 13 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="9.061" height="12.943" viewBox="0 0 9.061 12.943">
                <path
                  fill="#319400"
                  d="M9.531,2A4.527,4.527,0,0,0,5,6.531c0,3.4,4.531,8.414,4.531,8.414s4.531-5.016,4.531-8.414A4.527,4.527,0,0,0,9.531,2Zm0,6.149a1.618,1.618,0,1,1,1.618-1.618A1.619,1.619,0,0,1,9.531,8.149Z"
                  transform="translate(-5 -2)"
                />
              </svg>
            </div>
            {getLabel()}
          </div>

          <ShippingAddressForm
            onSubmit={(values) => {
              onChange(values);
              close();
            }}
          />
        </>
      )}
    </ContentPopover>
  );
}

export default ShippingTo;
