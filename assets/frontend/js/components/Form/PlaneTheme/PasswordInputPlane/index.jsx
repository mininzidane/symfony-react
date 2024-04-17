import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'formik';
import PasswordVisibilitySvg from './img/visibility-toggle-21x12.svg';

class PasswordInputPlane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      showPassword: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.togglePasswordDisplay = this.togglePasswordDisplay.bind(this);
  }

  handleChange(event) {
    const { name, onChange } = this.props;

    const { isTrimmed } = this.props;
    const {
      target: { value },
    } = event;
    const formattedValue = isTrimmed && value ? value.trim() : value;

    onChange(name, formattedValue);
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

  togglePasswordDisplay() {
    const { showPassword } = this.state;

    this.setState({ showPassword: !showPassword });
  }

  render() {
    const { id, label, name, className, disabled, placeholder, value, error, touched, maxLength, validate } =
      this.props;
    const { isFocused, showPassword } = this.state;
    const hasError = !!error && touched;
    const wrapperClassNames = classNames(
      'input-plane',
      'is-password',
      {
        'is-focused': isFocused,
        'is-error': hasError,
        'is-password-visible': showPassword,
      },
      className,
    );

    return (
      <>
        <div className={wrapperClassNames}>
          {label && <label htmlFor={id}>{label}</label>}

          <Field
            type={showPassword ? 'text' : 'password'}
            id={id}
            name={name}
            autoComplete={name}
            value={value}
            disabled={disabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            maxLength={maxLength}
            placeholder={placeholder}
            validate={validate}
          />

          <button type="button" className="input-plane__toggle-pwd" onClick={this.togglePasswordDisplay}>
            <img height="12" width="21" src={PasswordVisibilitySvg} className="d-b" alt="Password Toggle" />
          </button>
        </div>

        {hasError && <div className="form-hint-plane">{error}</div>}
      </>
    );
  }
}

PasswordInputPlane.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  isTrimmed: PropTypes.bool,
  onFocus: PropTypes.func,
  validate: PropTypes.func,
};

PasswordInputPlane.defaultProps = {
  disabled: false,
  className: '',
  label: '',
  value: '',
  error: '',
  maxLength: '',
  placeholder: '',
  touched: false,
  isTrimmed: false,
  onFocus: () => {},
  validate: undefined,
};

export default PasswordInputPlane;
