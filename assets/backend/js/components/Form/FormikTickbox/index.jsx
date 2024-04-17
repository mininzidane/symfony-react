import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TickboxCheckedSVG from './tickbox-checked-18x18.svg';
import TickboxUncheckedSVG from './tickbox-unchecked-18x18.svg';

class FormikTickbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, onChange } = this.props;
    onChange(name, event.target.checked);
    this.setState({ isActive: true });
    setTimeout(() => this.setState({ isActive: false }), 200);
  }

  render() {
    const { children, id, name, touched, className, value, error, disabled } = this.props;
    const { isActive } = this.state;
    const hasError = !!error && touched;

    const tickboxClass = classNames(
      'tickbox',
      {
        'is-error': hasError,
        'is-active': isActive,
      },
      className,
    );

    return (
      <>
        <div className={tickboxClass}>
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={value}
            onChange={this.handleChange}
            hidden
            disabled={disabled}
          />

          <label htmlFor={id}>{children}</label>

          <div className="tickbox__icon">
            <img src={TickboxUncheckedSVG} width="18" alt="✕" />
            {value && <img src={TickboxCheckedSVG} width="18" alt="✔" />}
          </div>
        </div>

        {hasError && <div className="text-error">{error}</div>}
      </>
    );
  }
}

FormikTickbox.defaultProps = {
  className: '',
  error: '',
  touched: false,
  disabled: false,
};

FormikTickbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  touched: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default FormikTickbox;
