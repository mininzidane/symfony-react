import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function TextAreaPlane({
  id,
  label,
  name,
  className,
  disabled,
  maxLength,
  value,
  error,
  touched,
  rows,
  isResizable,
  isBold,
  onChange,
  onBlur,
  isAutoGrow,
  optionalComponent,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef();
  function handleChange(event) {
    onChange(name, event.target.value);
  }

  function handleBlur() {
    setIsFocused(false);
    onBlur(name, true);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleClick(e) {
    if (optionalComponent && e.target !== ref.current) {
      ref.current?.focus();
    }
  }

  const hasError = !!error && touched;
  const wrapperClassNames = classNames(
    'textarea-plane',
    {
      'is-error': hasError,
      'is-focused': isFocused,
      'is-resizable': isResizable,
      'is-bold': isBold,
    },
    className,
  );

  useEffect(() => {
    if (isAutoGrow) {
      ref.current.style.height = 0; // correction when removing text
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <>
      <div className={wrapperClassNames} onClick={handleClick} aria-hidden="true">
        <textarea
          id={id}
          name={name}
          autoComplete={name}
          rows={rows}
          value={value}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder={label}
          ref={ref}
        />
        {optionalComponent}
      </div>

      {hasError && <div className="form-hint-plane">{error}</div>}
    </>
  );
}

TextAreaPlane.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  maxLength: PropTypes.string,
  disabled: PropTypes.bool,
  isResizable: PropTypes.bool,
  isBold: PropTypes.bool,
  error: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  rows: PropTypes.number,
  isAutoGrow: PropTypes.bool,
  optionalComponent: PropTypes.node,
};

TextAreaPlane.defaultProps = {
  disabled: false,
  touched: false,
  isResizable: false,
  isBold: false,
  className: '',
  value: '',
  maxLength: '',
  error: '',
  rows: 5,
  isAutoGrow: false,
  optionalComponent: null,
};

export default TextAreaPlane;
