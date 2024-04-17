import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import useStyles from './useStyles';

function SelectAutocomplete(props) {
  const {
    className,
    options,
    placeholder,
    onChange,
    onFocus,
    filterOptions,
    getOptionLabel,
    getOptionSelected,
    groupBy,
  } = props;
  const classes = useStyles(props);

  function handleChange(_, value) {
    onChange(value);
  }

  return (
    <Autocomplete
      classes={{
        inputRoot: classes.inputRoot,
        option: classes.option,
        groupLabel: classes.groupLabel,
      }}
      onChange={handleChange}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      groupBy={groupBy}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          onFocus={onFocus}
          ref={params.InputProps.ref}
          fullWidth
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
          }}
          placeholder={placeholder}
          className={classNames(classes.input, className)}
        />
      )}
    />
  );
}

SelectAutocomplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  filterOptions: PropTypes.func,
  getOptionLabel: PropTypes.func,
  getOptionSelected: PropTypes.func,
  groupBy: PropTypes.func,
  className: PropTypes.string,
};

SelectAutocomplete.defaultProps = {
  placeholder: '',
  className: '',
  onChange: () => {},
  onFocus: () => {},
  filterOptions: undefined,
  getOptionLabel: undefined,
  getOptionSelected: undefined,
  groupBy: undefined,
};

export default SelectAutocomplete;
