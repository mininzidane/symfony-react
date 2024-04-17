import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleChange(event) {
    const { name, onChange } = this.props;
    onChange(name, event.target.value);
  }

  handleBlur() {
    const { name, onBlur } = this.props;
    this.setState({ isFocused: false });
    onBlur(name, true);
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  render() {
    const { id, label, name, className, disabled, maxLength, value, error, touched, rows, isResizable } = this.props;
    const { isFocused } = this.state;
    const hasError = !!error && touched;
    const wrapperClassNames = classNames(
      'textarea form-group',
      {
        'is-error': hasError,
        'is-focused': isFocused,
        'is-resizable': isResizable,
      },
      className,
    );

    return (
      <>
        <div className={wrapperClassNames}>
          <textarea
            id={id}
            name={name}
            className="form-control m-b-0"
            autoComplete={name}
            rows={rows}
            value={value}
            disabled={disabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            maxLength={maxLength}
            placeholder={label}
          />
        </div>

        {hasError && <div className="text-danger">{error}</div>}
      </>
    );
  }
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  maxLength: PropTypes.string,
  disabled: PropTypes.bool,
  isResizable: PropTypes.bool,
  error: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  rows: PropTypes.number,
};

TextArea.defaultProps = {
  disabled: false,
  touched: false,
  isResizable: false,
  className: '',
  value: '',
  maxLength: '',
  error: '',
  rows: 5,
};

export default TextArea;
