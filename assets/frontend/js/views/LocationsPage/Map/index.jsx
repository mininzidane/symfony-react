import React, { memo } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from '../../../components/GoogleMap';
import GoogleAnalyticsService from '../../../api/GoogleAnalyticsService';
import Marker from './Marker';

function Map({ locations, activeMarkerName }) {
  const ga = new GoogleAnalyticsService();

  return (
    <GoogleMap
      height={500}
      withFitBounds={false}
      markers={locations.map((loc) => {
        let color = 'blue';

        if (loc.status === 'live') {
          color = 'green';
        }

        if (loc.name === activeMarkerName) {
          color = 'orange';
        }

        return {
          pos: loc.map,
          color,
          data: loc,
          isActive: loc.name === activeMarkerName,
          view: (params) => <Marker {...params} />,
        };
      })}
      onClickMarker={() => ga.sendEvent('map_selection', 'location_page', 'map_selection')}
      settings={{
        center: { lat: 38, lng: -115 },
      }}
    />
  );
}

Map.defaultProps = {
  activeMarkerName: '',
};

Map.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeMarkerName: PropTypes.string,
};

export default memo(Map);
