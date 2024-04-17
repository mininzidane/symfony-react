/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import SelectCategory from 'frontend/js/components/SelectCategory';
import useStyles from './useStyles';

function SelectNotification({ name, onChange, value, options }) {
  const classes = useStyles();

  function handleChange(val) {
    onChange(name, val);
  }

  const selectedOption = options.find((option) => option.value === value);

  if (!selectedOption) {
    return null;
  }

  return (
    <SelectCategory
      placement="bottom-end"
      isFlipEnabled={false}
      triggerClassName={classes.root}
      onChange={handleChange}
      selectedOption={selectedOption}
      options={options}
      classes={classes}
    />
  );
}

SelectNotification.propTypes = {
  options: [],
  value: null,
};

SelectNotification.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  options: PropTypes.array,
};

export default SelectNotification;
