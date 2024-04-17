import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactSelect, { createFilter } from 'react-select';

const defaultSelectSearchConfig = {
  ignoreCase: true,
  ignoreAccents: true,
  trim: true,
  matchFrom: 'start',
};

const getSelectFilterConfig = (config) => ({ ...defaultSelectSearchConfig, ...config });

function Select({
  id,
  label,
  disabled,
  required,
  options,
  name,
  value,
  onChange,
  onBlur,
  error,
  grouped,
  selectedGroup,
  groupSelectAttribute,
  formatOptionLabel,
  formatOptionValue,
  touched,
  onChangeAttribute,
  onChangeCallback,
  filterConfig,
  className,
  isSearchable,
  isClearable,
  styles,
  placeholder,
  isMulti,
  onMenuOpen,
  onMenuClose,
}) {
  const isValueObject = typeof value === 'object' && Boolean(value);
  const getCurrentGroupedValue = () => {
    let selectedOption = null;
    options.forEach(({ options: selectedOptions }) => {
      selectedOptions.forEach((option) => {
        if (option.value === value && option[groupSelectAttribute] === selectedGroup) {
          selectedOption = option;
        }
      });
    });

    return selectedOption;
  };

  const getCurrentValue = () => {
    if (grouped) {
      return getCurrentGroupedValue();
    }

    if (isMulti && value) {
      return options.filter((option) => value && value.includes(option[onChangeAttribute]));
    }

    if (isValueObject && value) {
      return options.find((option) => option[onChangeAttribute] === value[onChangeAttribute]) || null;
    }

    return options.find((option) => option[onChangeAttribute] === value) || null;
  };

  const selected = getCurrentValue();

  const handleChange = (attributes) => {
    let updatedValue = attributes ? attributes[onChangeAttribute] : null;
    if (isMulti && attributes) {
      updatedValue = attributes.map((attribute) => attribute[onChangeAttribute]);
    } else if (isValueObject) {
      updatedValue = attributes;
    }

    if (typeof onChangeCallback === 'function') {
      onChangeCallback(attributes);
    }

    onChange(name, updatedValue);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  function getOptionLabel(option) {
    if (formatOptionLabel) {
      return formatOptionLabel(option);
    }

    return option.label;
  }

  function getOptionValue(option) {
    if (isMulti) {
      return option[onChangeAttribute];
    }

    if (isValueObject) {
      return option;
    }

    if (formatOptionValue) {
      return formatOptionValue(option);
    }

    return option[onChangeAttribute];
  }

  const cls = classNames('select-wrapper', className);
  const defaultBorderColor = required && !selected ? '#ed5565' : '#cccccc';
  const defaultStyles = {
    control: (selectStyles, state) => ({
      ...selectStyles,
      boxShadow: 'none',
      borderColor: state.isFocused ? '#1ab394' : defaultBorderColor,
      minHeight: 34,
      borderRadius: 2,
      '&:hover': {
        borderColor: '#1ab394',
      },
    }),
    menu: (menuStyles) => ({
      ...menuStyles,
      margin: '2px 0',
      borderRadius: 2,
      zIndex: 999999,
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      padding: 6,
    }),
  };

  return (
    <div className={cls}>
      {label && <label htmlFor={id}>{label}</label>}
      <ReactSelect
        id={id}
        placeholder={placeholder}
        isDisabled={disabled}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        value={selected}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        filterOption={createFilter(getSelectFilterConfig(filterConfig))}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        styles={styles || defaultStyles}
      />
      {Boolean(error) && touched && <div className="text-danger">{error}</div>}
    </div>
  );
}

Select.defaultProps = {
  disabled: false,
  required: false,
  value: undefined,
  error: '',
  touched: false,
  formatOptionLabel: undefined,
  formatOptionValue: undefined,
  onChangeCallback: undefined,
  onChangeAttribute: 'value',
  grouped: false,
  groupSelectAttribute: 'group',
  selectedGroup: undefined,
  filterConfig: {},
  className: '',
  isSearchable: false,
  isClearable: false,
  placeholder: 'Select',
  label: '',
  isMulti: false,
  styles: null,
  onMenuOpen: () => null,
  onMenuClose: () => null,
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  formatOptionLabel: PropTypes.func,
  formatOptionValue: PropTypes.func,
  onChangeAttribute: PropTypes.string,
  className: PropTypes.string,
  grouped: PropTypes.bool,
  groupSelectAttribute: PropTypes.string,
  selectedGroup: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeCallback: PropTypes.func,
  filterConfig: PropTypes.shape({
    ignoreCase: PropTypes.bool,
    ignoreAccents: PropTypes.bool,
    trim: PropTypes.bool,
    matchFrom: PropTypes.string,
  }),
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  styles: PropTypes.shape({
    control: PropTypes.func,
    menu: PropTypes.func,
  }),
  placeholder: PropTypes.string,
  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
};

export default Select;
