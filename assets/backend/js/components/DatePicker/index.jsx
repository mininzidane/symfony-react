import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDatePicker from 'react-datepicker';

function DatePicker({ value, onChange, onBlur, placeholder, dateFormat, className }) {
  const cls = classNames('form-control', className);
  return (
    <ReactDatePicker
      className={cls}
      selected={value}
      placeholderText={placeholder}
      dateFormat={dateFormat}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

DatePicker.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  dateFormat: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

DatePicker.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  placeholder: '',
  className: '',
  dateFormat: 'MM/dd/yyyy',
  value: undefined,
};

export default DatePicker;
