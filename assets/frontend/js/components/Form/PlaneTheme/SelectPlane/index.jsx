/* eslint-disable no-param-reassign */
import React, { Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import classNames from 'classnames';
import ViewportService from 'frontend/js/lib/utils/ViewportService';

const SelectLazy = React.lazy(() => import('react-select'));
const ValueContainerLazy = React.lazy(() =>
  import('react-select').then((module) => ({ default: module.components.ValueContainer })),
);

function SelectPlane({
  id,
  className,
  name,
  label,
  disabled,
  options,
  value,
  error,
  touched,
  onChange,
  onBlur,
  formatOptionLabel,
  formatOptionValue,
  onChangeCallback,
  onChangeAttribute,
  isSearchable,
  convertMobileSelectValue,
  isBold,
  isNativeLabelDisabled,
  dropdownIcon,
  nativeLabel,
  placeholder,
  size,
}) {
  if (!Array.isArray(options)) {
    options = [];
  }

  const [isOpen, setIsOpen] = useState(false);
  const valueObj = value ? options.filter((option) => option[onChangeAttribute] === value)[0] : null;
  const hasError = !!error && touched;
  const isDisabled = !options.length || options.length === 1 || disabled;
  const wrapperClassName = classNames(
    'select-plane',
    {
      'is-bold': isBold,
      'is-error': hasError,
      'is-open': isOpen,
      'is-sm': size === 'sm',
    },
    className,
  );

  function handleChange(attributes) {
    const updatedValue = attributes[onChangeAttribute];
    if (typeof onChangeCallback === 'function') {
      onChangeCallback(attributes);
    }

    onChange(name, updatedValue);
  }

  function handleBlur() {
    onBlur(name, true);
  }

  function handleNativeOnChange(event) {
    const $el = event.target;
    const selectedValue = $el.options[$el.selectedIndex].value;
    const payload = {};
    if (typeof convertMobileSelectValue === 'function') {
      payload[onChangeAttribute] = convertMobileSelectValue(selectedValue);
    } else {
      payload[onChangeAttribute] = selectedValue;
    }

    handleChange(payload);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function getOptionLabel(option) {
    if (formatOptionLabel) {
      return formatOptionLabel(option);
    }
    return option.label;
  }

  function getOptionValue(option) {
    if (formatOptionValue) {
      return formatOptionValue(option);
    }

    return option[onChangeAttribute];
  }

  return (
    <>
      <div className={wrapperClassName}>
        <div className="select-plane__wrap">
          {ViewportService.isMobile() && (
            <select
              className="is-native"
              onChange={handleNativeOnChange}
              value={isNil(value) ? '' : value}
              disabled={isDisabled}
            >
              {!isNativeLabelDisabled && (
                <option value="" key="placeholder" disabled>
                  {nativeLabel || label || placeholder || 'Select value'}
                </option>
              )}

              {options.map((option) => {
                const optionLabel = getOptionLabel(option);
                const optionValue = getOptionValue(option);

                return (
                  <option value={optionValue} key={optionValue}>
                    {optionLabel}
                  </option>
                );
              })}
            </select>
          )}

          <Suspense fallback={<div style={{ minHeight: '40px' }} />}>
            <SelectLazy
              id={id}
              name={name}
              className="select-plane"
              classNamePrefix="select-plane"
              styles={{
                valueContainer: () => ({
                  '&: before': {},
                }),
              }}
              value={valueObj}
              indicatorSeparator={false}
              isDisabled={isDisabled}
              options={options}
              placeholder={placeholder || false}
              isSearchable={isSearchable}
              onBlur={handleBlur}
              onChange={handleChange}
              onMenuOpen={handleOpen}
              onMenuClose={handleClose}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (dropdownIcon ? <div className="select-plane__arrow" /> : null),
                ValueContainer: (props) => (
                  <div className="d-f ai-ct pe-n">
                    {label && <span className="select-plane__label">{label}</span>}
                    <ValueContainerLazy {...props} />
                  </div>
                ),
              }}
            />
          </Suspense>
        </div>

        {hasError && <div className="form-hint-plane">{error}</div>}
      </div>
    </>
  );
}

SelectPlane.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  placeholder: '',
  touched: false,
  value: undefined,
  isSearchable: false,
  isBold: false,
  isNativeLabelDisabled: true,
  formatOptionLabel: undefined,
  formatOptionValue: undefined,
  onChangeCallback: undefined,
  onChangeAttribute: 'value',
  convertMobileSelectValue: undefined,
  onBlur: () => {},
  label: '',
  dropdownIcon: true,
  nativeLabel: '',
  size: '',
};

SelectPlane.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  formatOptionLabel: PropTypes.func,
  formatOptionValue: PropTypes.func,
  onChangeCallback: PropTypes.func,
  convertMobileSelectValue: PropTypes.func,
  disabled: PropTypes.bool,
  isBold: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isNativeLabelDisabled: PropTypes.bool,
  error: PropTypes.string,
  onChangeAttribute: PropTypes.string,
  dropdownIcon: PropTypes.bool,
  nativeLabel: PropTypes.string,
  size: PropTypes.string,
};

export default SelectPlane;
