class GooglePlaceService {
  constructor(opts = {}) {
    this.google = window.google || [];
    this.placesInputUpdatedEventName = 'googlePlaces:inputUpdated';
    this.maxNumAttempts = 10;
    this.attemptTimeout = 500;
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

    return this.attemptInputBinding($el, 0);
  }

  attemptInputBinding($el, attempt = 0) {
    if (attempt > this.maxNumAttempts) {
      return false;
    }

    const nextAttempt = attempt + 1;
    if (typeof window.google === 'object' && window.google.maps) {
      const autocompleteField = new window.google.maps.places.Autocomplete($el, this.placesApiOptions);
      window.google.maps.event.addListener(autocompleteField, 'place_changed', () => {
        const event = new CustomEvent(this.placesInputUpdatedEventName, { detail: autocompleteField.getPlace() });
        $el.dispatchEvent(event);
      });

      return autocompleteField;
    }

    return setTimeout(() => this.attemptInputBinding($el, nextAttempt), this.attemptTimeout);
  }

  // eslint-disable-next-line class-methods-use-this
  triggerEvent($el, name, opts) {
    try {
      window.google.maps.event.trigger($el, name, opts);
    } catch (e) {
      // Ignore
    }
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
