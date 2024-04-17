/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import GoogleMapsService from 'frontend/js/lib/utils/GoogleMapsService';

class GoogleMap extends React.Component {
  static ID = 'google-map';

  static getDefaultMapOptions(googleMaps) {
    return {
      center: { lat: 38, lng: -105 },
      zoom: 4,
      mapTypeControl: false,
      streetViewControl: false,
      disableDefaultUI: true,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: googleMaps.ControlPosition.TOP_RIGHT,
      },
      zoomControl: true,
      zoomControlOptions: {
        position: googleMaps.ControlPosition.RIGHT_TOP,
      },
    };
  }

  static pin(color = 'blue') {
    return {
      url: `/img/map-markers/map-pin-${color}.png`,
      size: new google.maps.Size(18, 25),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(9, 25),
    };
  }

  constructor(props) {
    super(props);

    this.map = null;
    this.markers = null;
    this.googleMapsService = new GoogleMapsService();
  }

  componentDidMount() {
    if (typeof window.google === 'object' && window.google.maps) {
      this.initializeMap();
    } else {
      this.googleMapsService.addEventListener('load', () => {
        this.initializeMap();
      });
    }
  }

  componentDidUpdate() {
    this.initializeMarkers();
  }

  getMapSettings() {
    const { getMapOptions, settings } = this.props;

    return {
      ...GoogleMap.getDefaultMapOptions(window.google.maps),
      ...settings,
      ...getMapOptions(window.google.maps),
    };
  }

  initializeMap = () => {
    const { onMapLoad, id } = this.props;
    const mapEl = document.getElementById(id);

    this.map = new window.google.maps.Map(mapEl, this.getMapSettings());

    this.initializeMarkers();

    onMapLoad();
  };

  initializeMarkers() {
    const {
      markers,
      centerOnSingleMarker,
      highlightSelectedMarker,
      withFitBounds,
      onClickMarker,
      isMarkerBalloonOpenOnInit,
    } = this.props;

    if (!this.map) {
      return;
    }

    const infoWindow = new google.maps.InfoWindow({
      content: '',
    });

    if (this.markers) {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
    }

    const bounds = new google.maps.LatLngBounds();

    this.markers = markers.map((item) => {
      const { lng, lat, color } = item.pos;
      const marker = new google.maps.Marker({
        position: { lng: parseFloat(lng), lat: parseFloat(lat) },
        map: this.map,
        icon: GoogleMap.pin(item.color),
        zIndex: color === 'orange' ? 9999 : 1,
      });

      bounds.extend(marker.getPosition());

      if (item.view) {
        const that = this;

        function clickHandler(context) {
          const View = item.view;

          onClickMarker(item);
          infoWindow.setContent(ReactDOMServer.renderToString(<View data={item.data} />));
          if (highlightSelectedMarker) {
            marker.setIcon(GoogleMap.pin('orange'));

            const closeListener = infoWindow.addListener('closeclick', () => {
              marker.setIcon(GoogleMap.pin(item.color));
              google.maps.event.removeListener(closeListener);
            });
          }

          infoWindow.open(context.map, marker);
        }

        marker.addListener('click', () => clickHandler(that));
        setTimeout(() => {
          if (isMarkerBalloonOpenOnInit || item.isActive) {
            clickHandler(that);
          }
        }, 100);
      }

      return marker;
    });

    if (centerOnSingleMarker && markers && markers.length === 1) {
      // eslint-disable-next-line react/prop-types
      this.map.panTo(markers[0].pos);
    } else {
      this.map.panTo(this.getMapSettings().center);
    }

    if (withFitBounds) {
      this.map.fitBounds(bounds, {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      });
    }
  }

  render() {
    const { height, className, width, id } = this.props;

    return (
      <div
        className={className}
        style={{
          height: !className && height,
          width: !className && width,
        }}
        id={id || GoogleMap.ID}
      />
    );
  }
}

GoogleMap.propTypes = {
  className: PropTypes.string,
  getMapOptions: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.string,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.shape({
        short: PropTypes.string,
      }),
      loc: PropTypes.shape({
        coordinates: PropTypes.array,
      }),
      name: PropTypes.string,
      slug: PropTypes.string,
      state: PropTypes.shape({
        short: PropTypes.string,
      }),
      street_address: PropTypes.string,
      vendorSlug: PropTypes.string,
      zip: PropTypes.string,
    }),
  ),
  onMapLoad: PropTypes.func,
  onClickMarker: PropTypes.func,
  settings: PropTypes.shape({}),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  withFitBounds: PropTypes.bool,
  centerOnSingleMarker: PropTypes.bool,
  highlightSelectedMarker: PropTypes.bool,
};

GoogleMap.defaultProps = {
  height: '100%',
  getMapOptions: () => {},
  onMapLoad: () => {},
  onClickMarker: () => {},
  markers: [],
  width: '100%',
  withFitBounds: true,
  centerOnSingleMarker: true,
  highlightSelectedMarker: true,
  className: '',
  id: 'map',
  settings: {},
};

export default GoogleMap;
