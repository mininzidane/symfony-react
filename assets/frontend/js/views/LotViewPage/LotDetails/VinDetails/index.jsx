/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ButtonLink from 'frontend/js/components/ButtonLink';
import DetailsModal from './DetailsModal';

function VinDetails({ lot }) {
  if (!lot.vin || lot.vin.length !== 17) {
    return null;
  }

  function renderButton(props = {}) {
    return (
      <ButtonLink
        className="js-track-event"
        isDashed
        data-substep="more_vin_details_clicked"
        data-step="abm_lotpage"
        label={<FormattedMessage id="lotPage.details.vinDetails" />}
        {...props}
      />
    );
  }

  return (
    <>
      {window.customer ? (
        <DetailsModal lot={lot} trigger={renderButton()} />
      ) : (
        renderButton({ onClick: () => window.dispatchEvent(new CustomEvent('openAuthModal')) })
      )}
    </>
  );
}

export default VinDetails;
