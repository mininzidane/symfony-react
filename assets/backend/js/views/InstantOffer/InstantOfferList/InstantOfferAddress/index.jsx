import React from 'react';
import PropTypes from 'prop-types';
import Button from 'backend/js/components/Button';
import PickupTime from './PickupTime';
import PickupAddress from './PickupAddress';

function InstantOfferAddress({
  instantOffer,
  pickupTimes,
  setModalContent,
  setInstantOffer,
  setInstantOfferChangeLogs,
}) {
  return (
    <>
      {instantOffer.pickupContactName && <>Name: {instantOffer.pickupContactName}</>}
      {instantOffer.pickupPhone && (
        <>
          <br />
          Phone: <a href={`tel: ${instantOffer.pickupPhone}`}>{instantOffer.pickupPhone}</a>
        </>
      )}
      {instantOffer.pickupAddress && (
        <>
          <br />
          {instantOffer.pickupAddress}
        </>
      )}
      {instantOffer.pickupApartment && (
        <>
          <br />
          {instantOffer.pickupApartment}
        </>
      )}
      {instantOffer.pickupCity && instantOffer.pickupStateCode ? (
        <>
          <br />
          {instantOffer.pickupCity}, {instantOffer.pickupStateCode} {instantOffer.zip}
        </>
      ) : (
        <>{instantOffer.zip}</>
      )}
      {instantOffer.pickupCountry && (
        <>
          <br />
          {instantOffer.pickupCountry.name}
        </>
      )}

      {instantOffer.pickupDate && (
        <>
          <br />
          {new Date(instantOffer.pickupDate).toLocaleDateString()}
        </>
      )}
      {instantOffer.pickupTime && (
        <>
          <br />
          {instantOffer.pickupTime}
        </>
      )}
      <div className="m-t">
        {instantOffer.pickupAddress ? (
          <Button
            label="Edit pickup address"
            className="btn-xs"
            onClick={() =>
              setModalContent({
                title: 'Edit Pickup Modal',
                content: (
                  <PickupAddress
                    instantOffer={instantOffer}
                    setInstantOffer={setInstantOffer}
                    setModalContent={setModalContent}
                    setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                  />
                ),
              })
            }
          />
        ) : (
          <Button
            label="Set pickup address"
            className="btn-danger"
            onClick={() =>
              setModalContent({
                title: 'Edit Pickup Modal',
                content: (
                  <PickupAddress
                    instantOffer={instantOffer}
                    setInstantOffer={setInstantOffer}
                    setModalContent={setModalContent}
                    setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                  />
                ),
              })
            }
          />
        )}

        {instantOffer.pickupDate ? (
          <Button
            className="btn-xs"
            label="Edit pickup time"
            onClick={() =>
              setModalContent({
                title: 'Edit pickup time',
                content: (
                  <PickupTime
                    instantOffer={instantOffer}
                    setInstantOffer={setInstantOffer}
                    setModalContent={setModalContent}
                    setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                    pickupTimes={pickupTimes}
                  />
                ),
              })
            }
          />
        ) : (
          <Button
            className="btn-danger"
            label="Set pickup time"
            onClick={() =>
              setModalContent({
                title: 'Edit pickup time',
                content: (
                  <PickupTime
                    instantOffer={instantOffer}
                    setInstantOffer={setInstantOffer}
                    setModalContent={setModalContent}
                    setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                    pickupTimes={pickupTimes}
                  />
                ),
              })
            }
          />
        )}
      </div>
    </>
  );
}

InstantOfferAddress.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  pickupTimes: PropTypes.array,
};

InstantOfferAddress.defaultProps = {
  pickupTimes: [],
};

export default InstantOfferAddress;
