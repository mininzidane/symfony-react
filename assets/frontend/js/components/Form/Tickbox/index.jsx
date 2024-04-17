import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TickboxCheckedSVG from './img/tickbox-checked-18x18.svg';
import TickboxUncheckedSVG from './img/tickbox-unchecked-18x18.svg';
import TickboxUncheckedGraySVG from './img/tickbox-unchecked-gray-18x18.svg';

function Tickbox({ children, id, name, touched, className, value, error, onChange, disabled }) {
  function handleChange(event) {
    if (!disabled) {
      onChange(name, event.target.checked);
    }
  }

  const hasError = !!error && touched;

  const tickboxClass = classNames(
    'tickbox',
    {
      'is-error': hasError,
      'is-disabled': disabled,
    },
    className,
  );

  return (
    <>
      <div className={tickboxClass}>
        <input type="checkbox" id={id} name={name} checked={value} onChange={handleChange} hidden />

        <label htmlFor={id} className="ta-l">
          {children}
        </label>

        <div className="tickbox__icon">
          <>
            {value && <img src={TickboxCheckedSVG} width="18" alt="✔" />}
            {value ? (
              <img src={TickboxUncheckedSVG} width="18" alt="✕" />
            ) : (
              <img src={TickboxUncheckedGraySVG} width="18" alt="✕" />
            )}
          </>
        </div>
      </div>

      {hasError && <div className="text-error">{error}</div>}
    </>
  );
}

Tickbox.defaultProps = {
  className: '',
  error: '',
  touched: false,
  disabled: false,
};

Tickbox.propTypes = {
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

export default Tickbox;
