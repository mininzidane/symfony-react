/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import NumberService from 'frontend/js/lib/utils/NumberService';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import visa from 'frontend/images/shared/partners/visa-29x19@2x.png';
import mastercard from 'frontend/images/shared/partners/mastercard-29x19@2x.png';
import amex from 'frontend/images/shared/partners/amex-29x19@2x.png';
import discover from 'frontend/images/shared/partners/discover-29x19@2x.png';
import CheckmarkSvg from './img/checkmark.svg';

class InputPlane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNumericChange = this.handleNumericChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCurrencyBlur = this.handleCurrencyBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleChange(event) {
    const { name, onChange, rawEvent } = this.props;

    if (rawEvent) {
      onChange(event);
    } else {
      const { isTrimmed } = this.props;
      const {
        target: { value },
      } = event;
      const formattedValue = isTrimmed && value ? value.trim() : value;
      onChange(name, formattedValue);
    }
  }

  handleNumericChange(event) {
    const { name, onChange } = this.props;

    onChange(name, event.target.value.replace(/\D/g, ''));
  }

  handleBlur() {
    const { name, onBlur } = this.props;
    this.setState({ isFocused: false });
    onBlur(name, true);
  }

  handleFocus() {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
    onFocus();
  }

  // eslint-disable-next-line class-methods-use-this
  creditCartTypeImage(type) {
    const cardTypesImages = { visa, mastercard, amex, discover };
    return cardTypesImages[type];
  }

  handleCurrencyChange(event) {
    const { name, onChange, sign = '$' } = this.props;
    const rawNumbersValue = event.target.value.replace(/[^0-9.]/g, '').slice(0, 10);

    onChange(name, NumberService.formatUsCurrencyForInput(rawNumbersValue, sign));
  }

  handleCurrencyBlur(event) {
    const { name, onBlur, onChange, sign = '$' } = this.props;
    this.setState({ isFocused: false });
    onBlur(name, true);

    const rawNumbersValue = event.target.value.replace(/[^0-9.]/g, '');

    if (rawNumbersValue.indexOf('.') > -1) {
      let dollars = '';
      let cents = '';
      [dollars, cents] = rawNumbersValue.split('.');
      cents += '00';

      const result = `${dollars}.${cents.slice(0, 2)}`;
      onChange(name, NumberService.formatUsCurrencyForInput(result, sign));
    }
  }

  componentDidMount() {
    const { isAutoFocus, inputRef } = this.props;
    const $input = inputRef.current;

    if (isAutoFocus && !$input.value) {
      $input.focus();
    }
  }

  render() {
    const {
      id,
      label,
      name,
      className,
      disabled,
      placeholder,
      value,
      error,
      touched,
      mask,
      maxLength,
      isBold,
      inputRef,
      checkmark,
      loading,
      inputMode,
      isLabelOnTop,
      errorColor,
    } = this.props;
    const { isFocused } = this.state;
    const hasError = !!error && touched;
    const hasCheck = !error && checkmark && !loading;
    const hasLoader = loading;
    const creditCardType = mask === 'card' && ValidationService.identifyCreditCardType(value);
    const hasAdornment = hasCheck || hasLoader || creditCardType;
    const wrapperClassNames = classNames(
      'input-plane',
      {
        'is-bold': isBold,
        'is-focused': isFocused,
        'is-disabled': disabled,
        'is-error': hasError,
        'is-adornmented': hasAdornment,
      },
      errorColor !== 'red' && `error-color-${errorColor}`,
      className,
    );

    let isInputMask = false;
    const bind = {
      ref: inputRef,
      type: 'text',
      id,
      name,
      autoComplete: name,
      value,
      disabled,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      maxLength,
      placeholder,
    };

    if (mask && inputRef) {
      bind.ref = null;
      bind.inputRef = (el) => {
        inputRef.current = el;
      };
    }

    if (mask === 'card') {
      isInputMask = true;
      bind.mask = creditCardType === 'amex' ? '9999 999999 99999' : '9999 9999 9999 9999';
      bind.maskChar = null;
      bind.inputMode = 'numeric';
    } else if (mask === 'expDate') {
      isInputMask = true;
      bind.mask = '99 / 99';
      bind.maskChar = null;
      bind.placeholder = 'MM / YY';
      bind.inputMode = 'numeric';
    } else if (mask === 'cvv') {
      isInputMask = true;
      bind.mask = '9999';
      bind.maskChar = null;
      bind.placeholder = 'CVV';
      bind.inputMode = 'numeric';
    } else if (mask === 'numbers') {
      bind.onChange = this.handleNumericChange;
      bind.inputMode = 'numeric';
    } else if (mask === 'currency') {
      bind.onChange = this.handleCurrencyChange;
      bind.onBlur = this.handleCurrencyBlur;
    } else if (mask) {
      isInputMask = true;
      bind.mask = mask;
      bind.maskChar = null;
      if (inputMode) {
        bind.inputMode = inputMode;
      }
    }

    return (
      <div>
        {label && isLabelOnTop && (
          <label htmlFor={id} className="input-plane__top-label">
            {label}
          </label>
        )}

        <div className={wrapperClassNames}>
          {label && !isLabelOnTop && <label htmlFor={id}>{label}</label>}

          {isInputMask ? <InputMask {...bind} /> : <input {...bind} />}

          {hasAdornment && (
            <>
              {hasCheck && <img src={CheckmarkSvg} alt="✔" className="adornment" />}
              {hasLoader && <SpinnerWheel isCentered thickness={3} size={24} className="adornment" />}
              {creditCardType && (
                <img
                  src={this.creditCartTypeImage(creditCardType)}
                  alt={creditCardType}
                  className="adornment adornment_cc"
                />
              )}
            </>
          )}
        </div>

        {hasError && (
          <div className={classNames('form-hint-plane', errorColor !== 'red' && `color-${errorColor}`)}>{error}</div>
        )}
      </div>
    );
  }
}

InputPlane.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.node,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string,
  mask: PropTypes.string,
  maxLength: PropTypes.string,
  disabled: PropTypes.bool,
  isBold: PropTypes.bool,
  rawEvent: PropTypes.bool,
  error: PropTypes.node,
  placeholder: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  isTrimmed: PropTypes.bool,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  checkmark: PropTypes.bool,
  loading: PropTypes.bool,
  inputMode: PropTypes.string,
  errorColor: PropTypes.string,
  isLabelOnTop: PropTypes.bool,
  isAutoFocus: PropTypes.bool,
};

InputPlane.defaultProps = {
  disabled: false,
  className: '',
  label: '',
  value: '',
  error: '',
  mask: '',
  maxLength: '',
  placeholder: '',
  errorColor: 'red',
  touched: false,
  rawEvent: false,
  isBold: false,
  isTrimmed: false,
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {},
  inputRef: React.createRef(),
  checkmark: false,
  loading: false,
  inputMode: '',
  isLabelOnTop: false,
  isAutoFocus: false,
};

export default InputPlane;
