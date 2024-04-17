import React from 'react';
import PropTypes from 'prop-types';
import Select from 'frontend/js/components/Select';
import NumberService from 'frontend/js/lib/utils/NumberService';
import SelectTrigger from './SelectTrigger';
import useStyles from './useStyles';

function SelectFilter({ onChange, value, options, placeholder, isPort, error }) {
  const classes = useStyles();
  const selected = options.find((v) => v.value === value);

  return (
    <Select
      onChange={onChange}
      options={options.map((option) => ({
        ...option,
        label: option.count ? (
          <>
            <span>{option.label}</span> {NumberService.formatNumber(option.count)}
          </>
        ) : (
          option.label
        ),
      }))}
      selected={value}
      classes={{
        listItem: classes.listItem,
      }}
      trigger={<SelectTrigger label={selected?.label} placeholder={placeholder} isPort={isPort} error={error} />}
      placement="bottom-start"
      offsetTop={0}
    />
  );
}

SelectFilter.defaultProps = {
  onChange: () => {},
  value: '',
  placeholder: '',
  options: [],
  isPort: false,
  error: false,
};

SelectFilter.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  placeholder: PropTypes.node,
  options: PropTypes.array,
  isPort: PropTypes.bool,
  error: PropTypes.bool,
};

export default SelectFilter;
