/* eslint-disable react/prop-types */
import React from 'react';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import GoogleMap from 'frontend/js/components/GoogleMap';
import Marker from 'frontend/js/views/LocationsPage/Map/Marker';
import ContactCard from 'frontend/js/views/Landings/Shared/ContactCard';
import useStyles from './useStyles';

function ContactInfoCard({ iso2 }) {
  const classes = useStyles();

  const locations = OfficeLocationsService.getOfficeLocations();
  const selectedLocation = locations.find((l) => l.country.iso_2 === iso2);
  const { lng, lat } = selectedLocation?.point || {};

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <ContactCard data={selectedLocation} />
      </div>

      <div className={classes.map}>
        <GoogleMap
          height="100%"
          withFitBounds={false}
          centerOnSingleMarker
          markers={
            lng && lat
              ? [
                  {
                    pos: { lat, lng },
                    color: 'blue',
                    data: {
                      link: document.location.href,
                      name: `Copart Lounge ${selectedLocation.city}`,
                      address: selectedLocation.address,
                      country: selectedLocation.country.name,
                      city: selectedLocation.city,
                      state: selectedLocation.state?.name,
                      zip: selectedLocation.zip,
                      phone: selectedLocation.phoneNumber,
                    },
                    view: (params) => <Marker {...params} isTitleUpperCase={false} />,
                  },
                ]
              : undefined
          }
          getMapOptions={(googleMaps) => ({
            zoom: 8,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: true,
            zoomControlOptions: {
              position: googleMaps.ControlPosition.LEFT_TOP,
            },
          })}
          isMarkerBalloonOpenOnInit
        />
      </div>
    </div>
  );
}

export default ContactInfoCard;
