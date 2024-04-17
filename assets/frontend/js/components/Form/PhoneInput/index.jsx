import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import CountryService from 'frontend/js/api/CountryService';
import UserLocationService from 'frontend/js/api/UserLocationService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import PromiseService from 'frontend/js/lib/utils/PromiseService';

const DEFAULT_MASK = '999999999999999';

class PhoneInput extends Component {
  constructor() {
    super();

    this.state = {
      mask: DEFAULT_MASK,
      placeholder: DEFAULT_MASK,
    };

    this.iti = null;

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.promise = PromiseService.cancelable(import('intl-tel-input'));
    this.promise.promise
      .then((module) => module.default)
      .then((IntlTelInput) => {
        const { opts, value } = this.props;

        this.iti = IntlTelInput(this.inputRef.current, {
          utilsScript: '/vendor/intl-tel-input-utils.min.js',
          separateDialCode: true,
          nationalMode: false,
          formatOnDisplay: true,
          autoHideDialCode: false,
          autoPlaceholder: 'off',
          preferredCountries: OfficeLocationsService.getOfficeCountryIso2List(),
          initialCountry: 'auto',
          geoIpLookup: (success) => {
            const DEFAULT_COUNTRY_ISO2 = CountryService.getUserCountryIso2();
            const userLocationService = new UserLocationService();
            userLocationService
              .getUserGeoLocation()
              .then((location) => {
                const countryCode = get(location, 'country') || DEFAULT_COUNTRY_ISO2;
                success(countryCode);
              })
              .catch(() => {
                success(DEFAULT_COUNTRY_ISO2);
              });
          },
          ...opts,
        });

        if (value) {
          this.iti.setNumber(value);
        }

        if (window.intlTelInputUtils) {
          this.setMask();
        } else {
          this.timer = setInterval(() => {
            if (window.intlTelInputUtils) {
              clearInterval(this.timer);
              this.iti.handleUtils();
              this.setMask();
            }
          }, 300);
        }
      })
      .catch(() => {});

    this.inputRef.current.addEventListener('countrychange', this.handleCountryChange);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.iti?.destroy();
    this.iti = null;
    this.promise.cancel();
    this.promise = null;
    this.inputRef.current.removeEventListener('countrychange', this.handleCountryChange);
  }

  handleCountryChange = () => {
    const { onChange, name, value } = this.props;

    const country = this.getSelectedCountry();

    // Clear if value doesn't match country
    const dialCode = this.getDialCode();
    const isAreaCodes = country && Array.isArray(country.areaCodes);
    const isCountryChanged =
      value &&
      !(isAreaCodes
        ? country.areaCodes.find((item) => value.includes(`${dialCode}${item}`))
        : value.includes(dialCode));
    if (isCountryChanged) {
      onChange(name, '');
    }

    this.setMask();
  };

  handleChange = (event) => {
    if (!this.iti) {
      return;
    }

    const { onChange, name } = this.props;
    const { value } = this.inputRef.current;

    if (event.nativeEvent.inputType !== 'insertCompositionText') {
      onChange(name, `${this.getDialCode()}${value.replace(/[^\d+]/g, '')}`);
    }
  };

  handleBlur = () => {
    const { onChange, value, name, onBlur } = this.props;

    // Clear if only dial code is entered
    const country = this.getSelectedCountry();
    const dialCode = this.getDialCode();
    if (!country || dialCode.includes(value)) {
      onChange(name, '');
    }

    onBlur(name, true);
  };

  setMask = () => {
    if (!window.intlTelInputUtils) {
      return;
    }

    const country = this.getSelectedCountry() || {};
    let example = '';
    const isBulgaria = country.iso2?.toUpperCase() === CountryService.COUNTRIES.bulgaria.iso2;
    if (isBulgaria) {
      // intlTelInputUtils.getExampleNumber return an invalid 8-digit mobile phone number for Bulgaria
      example = `+${country.dialCode} 98 123 4567`;
    } else {
      const numberType = window.intlTelInputUtils.numberType.MOBILE;
      example = window.intlTelInputUtils.getExampleNumber(country.iso2, false, numberType);
    }

    const placeholder = (example && this.removeDialCode(example)) || DEFAULT_MASK;
    this.setState({
      placeholder,
      mask: placeholder.replace(/\d/g, '9'),
    });
  };

  getDialCode() {
    const country = this.getSelectedCountry();
    if (!country) {
      return '';
    }

    return `+${country.dialCode}`;
  }

  getSelectedCountry() {
    const country = this.iti?.getSelectedCountryData();

    if (country && !country.dialCode) {
      return null;
    }

    return country;
  }

  removeDialCode(val) {
    return (val && val.replace(this.getDialCode(), '').trim()) || '';
  }

  render() {
    const { value, inputComponent: InputComponent, ...props } = this.props;
    const { mask, placeholder } = this.state;

    return (
      <InputComponent
        {...props}
        placeholder={placeholder}
        mask={mask}
        value={this.removeDialCode(value)}
        inputRef={this.inputRef}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        inputMode="tel"
        rawEvent
      />
    );
  }
}

PhoneInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  // https://www.npmjs.com/package/intl-tel-input#options
  opts: PropTypes.shape({}),
  name: PropTypes.string.isRequired,
  inputComponent: PropTypes.elementType.isRequired,
};

PhoneInput.defaultProps = {
  value: '',
  onBlur: () => {},
  opts: {},
};

export default PhoneInput;
