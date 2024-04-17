import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GooglePlaceService from 'backend/js/lib/utils/GooglePlaceService';
import LocationService from 'backend/js/api/LocationService';
import ValidationService from 'backend/js/lib/ValidationService';
import GeoLocationShape from 'backend/js/lib/propshapes/GeoLocationShape';
import GoogleMapSvg from './img/gmaps-24x24.svg';

class PlacesInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.disableBlur = false;
    this.inputRef = React.createRef();
    this.googleInputRef = React.createRef();
    this.googlePlaceService = new GooglePlaceService({
      restrictZip: props.restrictZip,
      restrictAddress: props.restrictAddress,
      country: props.country,
    });
    this.errorMessages = {
      invalid: 'Invalid address location',
    };

    this.locationService = new LocationService();

    this.handlePlacesUpdateEvent = this.handlePlacesUpdateEvent.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDisplayedValue = this.getDisplayedValue.bind(this);
    this.clear = this.clear.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    this.bindGoogleInput();
    this.attachEventListener();
  }

  componentDidUpdate(prevProps) {
    const { isFocused } = this.props;

    if (prevProps.isFocused !== isFocused) {
      if (isFocused) {
        this.focus();
      }
    }
  }

  componentWillUnmount() {
    this.removeEventListener();
  }

  async getValidZip(zipcode) {
    if (!ValidationService.validateZip(zipcode)) {
      throw new Error('Invalid zipcode');
    }

    return this.locationService.getValidZip(zipcode).then((location) => {
      const emptyLocation = GooglePlaceService.getEmptyLocation();
      emptyLocation.country_code = GooglePlaceService.defaultCountryCode();

      return { ...emptyLocation, ...location };
    });
  }

  getDisplayedValue() {
    const { value, applyMask } = this.props;
    if (typeof applyMask === 'function') {
      return applyMask(value);
    }

    if (typeof value !== 'object') {
      return value;
    }

    if (value.city && value.state_code && value.country_code) {
      return `${value.city}, ${value.state_code} ${value.country_code}`;
    }

    return `${value.state_code} ${value.country_code}`;
  }

  bindGoogleInput() {
    const { current: $el } = this.googleInputRef;
    if (!$el) {
      return;
    }

    this.googlePlaceService.bindGooglePlacesInput($el);
  }

  attachEventListener() {
    const { current: $el } = this.googleInputRef;
    if (!$el) {
      return;
    }

    $el.addEventListener(this.googlePlaceService.placesInputUpdatedEventName, this.handlePlacesUpdateEvent);
  }

  handleFocus() {
    this.setState({ isFocused: true });

    const { current: $el } = this.inputRef;
    if (!$el) {
      return;
    }

    if (this.googleInputRef.current) {
      this.googleInputRef.current.dispatchEvent(new Event('focus'));
    }

    // Workaround for chrome autofill
    $el.setAttribute('autocomplete', 'new-password');
  }

  removeEventListener() {
    const { current: $el } = this.googleInputRef;
    if (!$el) {
      return;
    }

    $el.removeEventListener(this.googlePlaceService.placesInputUpdatedEventName, this.handlePlacesUpdateEvent);
  }

  triggerInvalidError() {
    const { name, onBlur, onError } = this.props;
    const { invalid: invalidError } = this.errorMessages;

    onBlur(name, true);
    onError(name, invalidError);
  }

  triggerUpdateSuccess(newLocation) {
    const { name, onError, onChange } = this.props;

    onError(name, '');
    onChange(name, newLocation);
  }

  handlePlacesUpdateEvent({ detail }) {
    const { rawLocation } = this.props;

    this.disableBlur = true;
    const formattedLocation = this.googlePlaceService.formatSelectedLocationForUserLocation(detail);

    if (!rawLocation) {
      if (formattedLocation.inputName) {
        return this.getValidZip(formattedLocation.inputName)
          .then((location) => {
            this.disableBlur = false;
            this.triggerUpdateSuccess(location);
            this.inputRef.current.blur();
          })
          .catch(() => {
            this.disableBlur = false;
            this.triggerInvalidError();
          });
      }

      if (!formattedLocation.zip && formattedLocation.lat && formattedLocation.lon) {
        return this.locationService
          .getLocationInformationByLatAndLong(formattedLocation.lat, formattedLocation.lon)
          .then((location) => {
            this.disableBlur = false;
            this.triggerUpdateSuccess(location);
            this.inputRef.current.blur();
          })
          .catch(() => {
            this.disableBlur = false;
            this.triggerInvalidError();
          });
      }
    }

    this.disableBlur = false;
    this.triggerUpdateSuccess(formattedLocation);
    this.inputRef.current.blur();

    return true;
  }

  handleChange(event) {
    const { name, onChange } = this.props;

    onChange(name, event.target.value, false);

    if (this.googleInputRef.current) {
      this.googleInputRef.current.value = event.target.value;
      this.googleInputRef.current.dispatchEvent(new Event('input'));
    }
  }

  handleKeydown = (event) => {
    if (this.googleInputRef.current) {
      this.googlePlaceService.triggerEvent(this.googleInputRef.current, 'keydown', { keyCode: event.keyCode });
    }
  };

  hasValidLocation() {
    const { value, error } = this.props;

    return !!error === false && typeof value === 'object' && value.zip !== undefined;
  }

  handleBlur() {
    const { name, onBlur, disableBlurSelect } = this.props;
    if (this.googleInputRef.current) {
      this.googleInputRef.current.dispatchEvent(new Event('blur'));
    }

    if (!this.disableBlur && !disableBlurSelect && !this.hasValidLocation()) {
      // Select first suggestion
      this.googlePlaceService.triggerEvent(this.googleInputRef.current, 'keydown', { keyCode: 40 });
      this.googlePlaceService.triggerEvent(this.googleInputRef.current, 'keydown', { keyCode: 13 });
    }

    this.setState({ isFocused: false });
    onBlur(name, true);
  }

  clear() {
    const { name, onChange } = this.props;

    onChange(name, '');
    this.inputRef.current.focus();
  }

  focus() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { id, label, name, className, error, touched, onClick, placeholder, disabled, isShowGoogleMapIcon } =
      this.props;
    const hasError = !!error && touched;
    const { isFocused } = this.state;

    const wrapperClassNames = classNames(
      'input-plane is-places',
      {
        'is-focused': isFocused,
        'is-disabled': disabled,
        'is-error': hasError,
      },
      className,
    );

    return (
      <>
        <div className={wrapperClassNames}>
          {label && <label htmlFor={id}>{label}</label>}

          <div className="pos-r wide">
            <input
              className="fit"
              ref={this.inputRef}
              type="text"
              id={id}
              name={name}
              value={this.getDisplayedValue()}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onKeyDown={this.handleKeydown}
              onClick={onClick}
              placeholder={placeholder}
              disabled={disabled}
            />

            <input
              className="google-input"
              ref={this.googleInputRef}
              type="text"
              readOnly
              value={this.getDisplayedValue()}
            />
          </div>

          {isShowGoogleMapIcon && <img src={GoogleMapSvg} alt="Google Maps" style={{ opacity: disabled ? 0.5 : 1 }} />}
        </div>

        {hasError && <div className="text-danger">{error}</div>}
      </>
    );
  }
}

PlacesInput.defaultProps = {
  isFocused: false,
  className: '',
  value: undefined,
  error: '',
  touched: false,
  applyMask: undefined,
  onClick: () => {},
  restrictZip: false,
  restrictAddress: false,
  disableBlurSelect: false,
  disabled: false,
  placeholder: '',
  country: 'us',
  rawLocation: false,
  isShowGoogleMapIcon: true,
};

PlacesInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, GeoLocationShape]),
  isFocused: PropTypes.bool,
  error: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  applyMask: PropTypes.func,
  onClick: PropTypes.func,
  restrictZip: PropTypes.bool,
  restrictAddress: PropTypes.bool,
  disableBlurSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  country: PropTypes.string,
  rawLocation: PropTypes.bool,
  isShowGoogleMapIcon: PropTypes.bool,
};

export default PlacesInput;
