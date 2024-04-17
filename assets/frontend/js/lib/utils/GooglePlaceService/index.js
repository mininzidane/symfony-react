import GoogleMapsService from 'frontend/js/lib/utils/GoogleMapsService';

class GooglePlaceService {
  constructor(opts = {}) {
    this.google = window.google || [];
    this.placesInputUpdatedEventName = 'googlePlaces:inputUpdated';
    this.placesInputInitializedEventName = 'googlePlaces:inputInitialized';
    this.maxNumAttempts = 10;
    this.attemptTimeout = 400;
    this.placesApiOptions = {};

    this.emptyLocation = GooglePlaceService.getEmptyLocation();

    if (opts.country) {
      this.placesApiOptions.componentRestrictions = {
        country: opts.country,
      };
    }

    if (opts.restrictZip) {
      this.placesApiOptions.types = ['(regions)'];
    } else if (opts.restrictAddress) {
      this.placesApiOptions.types = ['address'];
    }

    this.googleMapsService = new GoogleMapsService();
  }

  static getEmptyLocation() {
    return {
      name: undefined,
      address: undefined,
      city: undefined,
      state: undefined,
      state_code: undefined,
      country: undefined,
      country_code: undefined,
      lat: undefined,
      lon: undefined,
      zip: undefined,
    };
  }

  static defaultCountryCode() {
    return 'US';
  }

  bindGooglePlacesInput($el) {
    if (!($el instanceof Element)) {
      return false;
    }
    return this.inputBinding($el);
  }

  inputBinding($el) {
    if (typeof window.google === 'object' && window.google.maps) {
      const autocompleteField = new window.google.maps.places.Autocomplete($el, this.placesApiOptions);
      window.google.maps.event.addListener(autocompleteField, 'place_changed', () => {
        const event = new CustomEvent(this.placesInputUpdatedEventName, { detail: autocompleteField.getPlace() });
        $el.dispatchEvent(event);
      });
      this.checkPlaceInputIsInitialized($el);
      return autocompleteField;
    }

    this.googleMapsService.addEventListener('load', () => {
      this.inputBinding($el);
    });

    return true;
  }

  checkPlaceInputIsInitialized($el, attempt = 0) {
    if (attempt > this.maxNumAttempts) {
      return false;
    }
    const initialized = $el.classList.contains('pac-target-input');
    if (initialized) {
      $el.dispatchEvent(new CustomEvent(this.placesInputInitializedEventName));
      return true;
    }
    const nextAttempt = attempt + 1;
    return setTimeout(() => this.checkPlaceInputIsInitialized($el, nextAttempt), this.attemptTimeout);
  }

  // eslint-disable-next-line class-methods-use-this
  triggerEvent($el, name, opts) {
    try {
      window.google.maps.event.trigger($el, name, opts);
    } catch (e) {
      // Ignore
    }
  }

  currentLocation(position) {
    return this.googleMapsService
      .ready()
      .then((maps) => {
        const geocoder = new maps.Geocoder();
        const lat = position?.coords.latitude;
        const lng = position?.coords.longitude;
        const latlng = { lat, lng };
        return geocoder
          .geocode({ location: latlng })
          .then((response) => {
            const result = response.results[0];
            if (result) {
              const data = result.address_components.reduce(
                (acc, item) => {
                  if (item.types.includes('street_number')) {
                    acc.streetNumber = item.long_name || item.short_name;
                  }
                  if (item.types.includes('route')) {
                    acc.street = item.long_name || item.short_name;
                  }
                  if (item.types.includes('sublocality')) {
                    acc.sublocality = item.long_name || item.short_name;
                  }
                  if (item.types.includes('locality')) {
                    acc.city = item.long_name || item.short_name;
                  }
                  if (item.types.includes('country')) {
                    acc.country = item.long_name;
                    acc.countryShort = item.short_name;
                  }
                  if (item.types.includes('postal_code')) {
                    acc.zip = item.long_name;
                  }
                  return acc;
                },
                {
                  formattedAddress: result.formatted_address,
                },
              );

              return {
                status: true,
                message: 'success',
                data,
              };
            }
            return {
              status: false,
              message: 'No results found',
            };
          })
          .catch((e) => `Geocoder failed due to: ${e}`);
      })
      .catch(() => {});
  }

  geocode(query) {
    return this.googleMapsService.ready().then((maps) => {
      const geocoder = new maps.Geocoder();
      return geocoder
        .geocode({
          address: query,
        })
        .catch((e) => `Geocoder failed due to: ${e}`);
    });
  }

  geocodeAddress({ countryIso2, zip }) {
    return this.googleMapsService.ready().then((maps) => {
      const geocoder = new maps.Geocoder();
      return geocoder
        .geocode({
          address: zip,
          componentRestrictions: {
            country: countryIso2,
          },
        })
        .catch((e) => `Geocoder failed due to: ${e}`);
    });
  }

  formatSelectedLocationForUserLocation(place) {
    if (typeof place !== 'object') {
      return place;
    }

    const location = this.getEmptyFormattedUsLocation();
    const addressComponents = place.address_components || [];
    let street;
    let streetNumber;

    addressComponents.forEach((addressComponent) => {
      const componentTypes = addressComponent.types || [];

      if (componentTypes.indexOf('locality') !== -1) {
        location.city = addressComponent.long_name;
      } else if (!location.city && componentTypes.indexOf('postal_town') !== -1) {
        location.city = addressComponent.long_name;
      } else if (!location.city && componentTypes.indexOf('administrative_area_level_3') !== -1) {
        location.city = addressComponent.long_name;
      } else if (componentTypes.indexOf('administrative_area_level_1') !== -1) {
        location.state = addressComponent.long_name;
        location.state_code = addressComponent.short_name;
      } else if (componentTypes.indexOf('postal_code') !== -1) {
        location.zip = addressComponent.short_name;
      } else if (componentTypes.indexOf('route') !== -1) {
        street = addressComponent.short_name;
      } else if (componentTypes.indexOf('street_number') !== -1) {
        streetNumber = addressComponent.short_name;
      } else if (componentTypes.indexOf('country') !== -1) {
        location.country_code = addressComponent.short_name;
        if (addressComponent.short_name === 'US') {
          location.country = 'USA';
        }
      }
    });

    if (street || streetNumber) {
      location.address = [streetNumber, street].filter(Boolean).join(' ');
    }

    if (place.geometry && place.geometry.location) {
      location.lat = parseFloat(place.geometry.location.lat()).toFixed(6);
      location.lon = parseFloat(place.geometry.location.lng()).toFixed(6);
    }

    if (!location.lat && !location.lon && place.name) {
      location.inputName = place.name;
    }

    return location;
  }

  getEmptyFormattedUsLocation() {
    return { ...this.emptyLocation };
  }
}

export default GooglePlaceService;
