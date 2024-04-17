import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import NumberService from 'backend/js/lib/utils/NumberService';
import CheckmarkSvg from './img/checkmark.svg';
import SpinnerWheel from '../../SpinnerWheel';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCurrencyBlur = this.handleCurrencyBlur.bind(this);
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

  handleBlur() {
    const { name, onBlur } = this.props;
    this.setState({ isFocused: false });
    onBlur(name, true);
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  handleCurrencyChange(event) {
    const { name, onChange } = this.props;
    const rawNumbersValue = event.target.value.replace(/[^0-9.]/g, '').slice(0, 10);

    onChange(name, NumberService.formatUsCurrencyForInput(rawNumbersValue));
  }

  handleCurrencyBlur(event) {
    const { name, onBlur, onChange } = this.props;
    this.setState({ isFocused: false });
    onBlur(name, true);

    const rawNumbersValue = event.target.value.replace(/[^0-9.]/g, '');
    if (rawNumbersValue.indexOf('.') > -1) {
      onChange(name, NumberService.formatUsCurrencyForInput(rawNumbersValue));
    }
  }

  render() {
    const {
      id,
      inputRef,
      label,
      name,
      className,
      disabled,
      required,
      placeholder,
      value,
      mask,
      error,
      touched,
      maxLength,
      type,
      labelClassName,
      inputWrapperClassName,
      checkmark,
      loading,
      success,
      inputGroupClassName,
    } = this.props;
    const { isFocused } = this.state;
    const hasError = !!error && touched;
    const hasLoader = loading;
    const hasCheck = !error && checkmark && !loading;
    const hasAdornment = hasCheck || hasLoader;
    const wrapperClassNames = classNames(
      'form-group',
      {
        'is-focused': isFocused,
        'is-error': hasError,
      },
      className,
    );

    const labelClassNames = classNames('control-label', labelClassName);

    const inputWrapperClassNames = classNames(inputWrapperClassName);

    const inputGroupClassNames = classNames(
      {
        'input-group': hasAdornment,
      },
      inputGroupClassName,
    );

    let isInputMask = false;
    const bind = {
      id,
      name,
      type,
      value,
      disabled,
      maxLength,
      placeholder,
      ref: inputRef,
      className: classNames('form-control', {
        'is-required': required && !value,
      }),
      autoComplete: name,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };

    if (mask && inputRef) {
      bind.ref = null;
      bind.inputRef = (el) => {
        inputRef.current = el;
      };
    }

    if (mask) {
      isInputMask = true;
      if (mask === 'currency') {
        bind.onChange = this.handleCurrencyChange;
        bind.onBlur = this.handleCurrencyBlur;
      } else {
        bind.mask = mask;
        bind.maskChar = null;
      }
    }

    return (
      <>
        <div className={wrapperClassNames}>
          {label && (
            <label className={labelClassNames} htmlFor={id}>
              {label}
            </label>
          )}

          <div className={inputWrapperClassNames}>
            <div className={inputGroupClassNames}>
              {isInputMask ? <InputMask {...bind} /> : <input {...bind} />}

              {hasAdornment && (
                <div className="input-group-addon">
                  {hasCheck && <img src={CheckmarkSvg} alt="✔" />}
                  {hasLoader && <SpinnerWheel isCentered thickness={3} size={12} />}
                </div>
              )}
            </div>
            {hasError && <div className="text-danger">{error}</div>}
            {success && <div style={{ fontWeight: 700, color: '#2E8540' }}>{success}</div>}
          </div>
        </div>
      </>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mask: PropTypes.string,
  maxLength: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  labelClassName: PropTypes.string,
  inputWrapperClassName: PropTypes.string,
  checkmark: PropTypes.bool,
  loading: PropTypes.bool,
  success: PropTypes.string,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  rawEvent: PropTypes.bool,
  isTrimmed: PropTypes.bool,
  inputGroupClassName: PropTypes.string,
};

Input.defaultProps = {
  disabled: false,
  required: false,
  className: '',
  type: 'text',
  label: '',
  value: '',
  mask: '',
  error: '',
  maxLength: '',
  placeholder: '',
  touched: false,
  labelClassName: '',
  inputWrapperClassName: '',
  checkmark: false,
  loading: false,
  success: '',
  inputRef: null,
  rawEvent: false,
  isTrimmed: false,
  inputGroupClassName: '',
};

export default Input;
