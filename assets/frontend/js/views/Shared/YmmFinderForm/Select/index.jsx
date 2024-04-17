import React, { Suspense, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/get';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import getThemeStyles from './getThemeStyles';
import ClearIndicator from './SelectComponents/ClearIndicator';
import DropdownIndicator from './SelectComponents/DropdownIndicator';
import useStyles from './useStyles';

const ReactSelectLazy = React.lazy(() => import('react-select'));

function Select({ label, options, selectedOption, onChange, placeholder, isClearable, isDisabled, className }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const classes = useStyles({ isDropdownOpen });
  const hasSelectedoption = Boolean(selectedOption);
  const themeStyles = getThemeStyles(hasSelectedoption);
  const isGroupedOptions = options.length > 1 && options[0].options;
  const selectRef = useRef();

  function handleChange(option) {
    setIsDropdownOpen(false);
    onChange(option);
  }

  function handleNativeChange(event) {
    function getOptionsArray() {
      if (isGroupedOptions) {
        return options.map((option) => option.options).flat();
      }

      return options;
    }

    function findOptionByValue(optionsArray, value) {
      return optionsArray.find((option) => `${option.value}` === value) || null;
    }

    onChange(findOptionByValue(getOptionsArray(), event.target.value));
  }

  function getDropdownIndicator() {
    return isClearable && selectedOption ? null : <DropdownIndicator isDropdownOpen={isDropdownOpen} />;
  }

  function getClearIndicator({ innerProps: { ref, ...restInnerProps } }) {
    return <ClearIndicator {...restInnerProps} ref={ref} />;
  }

  function getNativeOptions() {
    const nativeOptions = [];

    nativeOptions.push(
      <option value="" disabled key="placeholder" hidden={isGroupedOptions}>
        {placeholder}
      </option>,
    );

    if (isGroupedOptions) {
      return [
        ...nativeOptions,
        ...options.map((option) => (
          <optgroup label={option.label} key={option.label}>
            {option.options.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </optgroup>
        )),
      ];
    }

    return [
      ...nativeOptions,
      ...options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      )),
    ];
  }

  const isMobile = ViewportService.isMobile();

  return (
    <div
      className={classnames(classes.root, className)}
      onMouseEnter={() => {
        if (!isMobile && !isDisabled) {
          setIsDropdownOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (!isMobile && !isDisabled) {
          setIsDropdownOpen(false);
          selectRef.current?.blur();
        }
      }}
    >
      {hasSelectedoption && <div className={classes.label}>{label}</div>}

      {isMobile && (
        <>
          <select
            className={classes.nativeSelect}
            onChange={handleNativeChange}
            value={get(selectedOption, 'value') || ''}
            disabled={isDisabled}
          >
            {!isDisabled && getNativeOptions()}
          </select>

          {selectedOption && (
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="clear"
              className={classes.nativeClearButton}
            />
          )}
        </>
      )}

      <Suspense fallback={<div style={{ minHeight: '52px' }} />}>
        <ReactSelectLazy
          ref={selectRef}
          options={options}
          value={selectedOption}
          placeholder={placeholder}
          onChange={handleChange}
          isDisabled={isDisabled}
          isClearable
          isSearchable
          openMenuOnFocus
          menuIsOpen={isDropdownOpen}
          styles={themeStyles}
          onMenuOpen={() => setIsDropdownOpen(true)}
          onMenuClose={() => setIsDropdownOpen(false)}
          components={{
            DropdownIndicator: getDropdownIndicator,
            ClearIndicator: getClearIndicator,
            IndicatorSeparator: () => null,
            NoOptionsMessage: () => null,
          }}
        />
      </Suspense>
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOption: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
};

Select.defaultProps = {
  selectedOption: null,
  onChange: null,
  placeholder: null,
  label: null,
  className: '',
  isDisabled: false,
  isClearable: true,
  labelKey: null,
  valueKey: null,
};

export default Select;
