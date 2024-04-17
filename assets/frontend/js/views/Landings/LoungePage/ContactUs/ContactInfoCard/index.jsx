/* eslint-disable react/prop-types */
import LanguageService from 'frontend/js/api/LanguageService';
import React from 'react';
import GoogleMap from 'frontend/js/components/GoogleMap';
import Marker from 'frontend/js/views/LocationsPage/Map/Marker';
import ContactCard from 'frontend/js/views/Landings/Shared/ContactCard';
import useStyles from './useStyles';

function ContactInfoCard({ location }) {
  const classes = useStyles();
  const currentLocale = LanguageService.getCurrentLocale();
  const { lng, lat } = location?.point || {};

  if (!location) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <ContactCard data={location} />
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
                      name: `Copart Lounge ${location.city}`,
                      address: location.address,
                      localizedAddress: location.localizedAddress?.[currentLocale],
                      country: location.country.name,
                      city: location.city,
                      state: location.state?.name,
                      zip: location.zip,
                      phone: location.phoneNumber,
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
