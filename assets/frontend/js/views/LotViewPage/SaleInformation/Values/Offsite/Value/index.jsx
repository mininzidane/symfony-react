/* eslint-disable react/prop-types */
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl-phraseapp';
import LocationService from 'frontend/js/api/LocationService';

function Offsite({ data }) {
  if (isEmpty(data)) {
    return null;
  }

  const { contactName, address, city, state, zip } = data;

  return (
    <div style={{ color: '#828282' }}>
      (<FormattedMessage id="lotPage.saleInfo.offsite" />)
      <div style={{ fontWeight: 'normal' }}>
        {contactName && (
          <>
            {contactName.toUpperCase()}
            <br />
          </>
        )}
        {address && (
          <>
            {address}
            <br />
          </>
        )}
        {LocationService.formatCityStateZip(city, state, zip).toUpperCase()}
      </div>
    </div>
  );
}

export default Offsite;
