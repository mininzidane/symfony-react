import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

function FormikDateSelector({
  id,
  label,
  name,
  selected,
  disabled,
  dateFormat,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
}) {
  const handleChange = (value) => {
    onChange(name, value);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <div className={`datepicker-wrapper form-block ${!!error && touched ? 'has-error' : ''}`}>
      {label && (
        <label className="control-label" htmlFor={id}>
          {label}
        </label>
      )}
      <DatePicker
        id={id}
        className="form-control"
        selected={selected && !(selected instanceof Date) ? new Date(selected) : selected}
        onChange={handleChange}
        onBlur={handleBlur}
        dropdownMode="scroll"
        dateFormat={dateFormat || 'MM/dd/yyyy'}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        autoComplete="off"
        disabled={disabled}
        placeholderText={placeholder}
      />
      {!!error && touched && <div className="field-error field-error--datepicker">{error}</div>}
    </div>
  );
}

FormikDateSelector.defaultProps = {
  disabled: false,
  selected: undefined,
  dateFormat: undefined,
  error: '',
  touched: false,
  placeholder: '',
  label: '',
};

FormikDateSelector.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  dateFormat: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default FormikDateSelector;
