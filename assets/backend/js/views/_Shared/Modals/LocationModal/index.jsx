import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LocationService from 'backend/js/api/LocationService';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';

function LocationModal({ auction, sourceId, isModalOpen, onModalClose }) {
  const [location, setLocation] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const locationService = new LocationService();

  async function loadLocationDetails() {
    try {
      const { location: responseLocation } = await locationService.getLocationDetailsByAuctionAndSource(
        auction,
        sourceId,
      );
      setLocation(responseLocation);
    } catch (e) {
      setNotFound(true);
    }
  }

  useEffect(() => {
    (async () => {
      if (isModalOpen && !location && !notFound) {
        await loadLocationDetails();
      }
    })();
  }, [isModalOpen]);

  return (
    <ModalWindow onClose={onModalClose} isOpen={isModalOpen} size="lg">
      {location && (
        <>
          <ModalWindowHeader title={location.name} onClose={onModalClose} />
          <ModalWindowBody className="p-20">
            <dl className="dl-horizontal">
              <dt>General Manager:</dt>
              <dd>
                <i className="fa fa-fw fa-user-circle" /> {location.gmName}
                <br />
                <i className="fa fa-fw fa-envelope" /> <a href={`mailto:${location.gmEmail}`}>{location.gmEmail}</a>
              </dd>
              {location.rmName && location.rmEmail && (
                <>
                  <dt>Regional Manager:</dt>
                  <dd>
                    <i className="fa fa-fw fa-user-circle-o" /> {location.rmName}
                    <br />
                    <i className="fa fa-fw fa-envelope" /> <a href={`mailto:${location.rmEmail}`}>{location.rmEmail}</a>
                  </dd>
                </>
              )}
              {location.officeHours && (
                <>
                  <dt>Office Hours:</dt>
                  <dd>
                    <i className="fa fa-fw fa-clock-o" /> {location.officeHours}
                  </dd>
                </>
              )}
              <dt>Address:</dt>
              <dd>
                <i className="fa fa-fw fa-location-arrow" /> {location.address}
                <br />
                <i className="fa fa-fw" /> {location.city}, {location.stateCode} {location.zip}
                <br />
                <i className="fa fa-fw" /> {location.country ? location.country.name : location.countryCode}
              </dd>
              <dt>Phone:</dt>
              <dd>
                <i className="fa fa-fw fa-phone" /> {location.phone}
              </dd>
              <dt>Fax:</dt>
              <dd>
                <i className="fa fa-fw fa-fax" /> {location.fax}
              </dd>
              <dt>Yard #:</dt>
              <dd>{location.id}</dd>
            </dl>
          </ModalWindowBody>
        </>
      )}
      {notFound && <ModalWindowBody>Location Details Not Available</ModalWindowBody>}
    </ModalWindow>
  );
}

LocationModal.propTypes = {
  auction: PropTypes.string.isRequired,
  sourceId: PropTypes.number.isRequired,
  isModalOpen: PropTypes.bool,
  onModalClose: PropTypes.func,
};

LocationModal.defaultProps = {
  isModalOpen: false,
  onModalClose: () => null,
};

export default LocationModal;
