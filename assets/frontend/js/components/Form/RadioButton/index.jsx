import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function RadioButton({ label, id, name, onChange, className, value, animate, isChecked, isDisabled, viewType, size }) {
  const [isActive, setIsActive] = useState(false);
  const timeoutId = useRef();
  function handleChange(event) {
    if (event.target.checked) {
      onChange(name, event.target.value);
    }
    setIsActive(true);
    timeoutId.current = setTimeout(() => setIsActive(false), 200);
  }

  useEffect(() => () => clearTimeout(timeoutId.current), []);

  const wrapperClass = classNames(
    'radio-button',
    {
      'is-active': isActive,
      'is-disabled': isDisabled,
      'is-checked': isChecked,
      'is-round-checkmark': viewType === 'roundCheckmark',
      'is-lg': size === 'lg',
      'is-sm': size === 'sm',
      'is-animating': animate && isActive,
    },
    className,
  );

  return (
    <div className={wrapperClass}>
      <input type="radio" id={id} name={name} value={value} onChange={handleChange} checked={isChecked} hidden />

      <label htmlFor={id}>
        <div className="radio-button__svg-icon">
          {viewType === 'default' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-21967 5741 20 20">
              <g transform="translate(-21967 5741)">
                <path
                  fill="#2158F5"
                  d="M12,2A10,10,0,1,0,22,12,10.029,10.029,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8,8.024,8.024,0,0,1-8,8Z"
                  transform="translate(-2 -2)"
                />
                {isChecked && <circle fill="#2158F5" cx="5" cy="5" r="5" transform="translate(5 5)" />}
              </g>
            </svg>
          )}
          {viewType === 'roundCheckmark' && (
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              {isChecked ? (
                <>
                  <circle cx="12" cy="12" r="12" fill="#4A9029" />
                  <path
                    d="m14.327 9.158-3.77 4.21-1.027-1.263a.506.506 0 0 0-.701-.044.583.583 0 0 0-.195.347c-.024.137 0 .279.066.399l1.214 2.245c.058.099.138.18.233.237a.606.606 0 0 0 .62 0 .666.666 0 0 0 .233-.237c.192-.28 3.835-5.262 3.835-5.262.45-.562-.124-1.053-.508-.632Z"
                    fill="#fff"
                  />
                </>
              ) : (
                <circle cx="12" cy="12" r="11.5" stroke="#333" />
              )}
            </svg>
          )}
        </div>

        {label}
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  label: PropTypes.node.isRequired,
  viewType: PropTypes.oneOf(['default', 'roundCheckmark']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  animate: PropTypes.bool,
  className: PropTypes.string,
};

RadioButton.defaultProps = {
  className: '',
  viewType: 'default',
  size: 'md',
  isChecked: false,
  isDisabled: false,
  animate: false,
  onChange: () => {},
};

export default RadioButton;
