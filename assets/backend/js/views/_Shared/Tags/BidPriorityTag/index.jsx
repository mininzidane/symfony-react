import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'backend/js/components/Form/Select';
import BidService from 'backend/js/api/BidService';

function BidPriorityTag({ bidId, priority, onChange, onBlur, disabled, onMenuOpen, onMenuClose }) {
  const selectStyles = useMemo(
    () => ({
      control: (provided) => ({
        ...provided,
        minHeight: '26px',
        backgroundColor: (() => {
          if (disabled) {
            return '#cacaca';
          }

          if (priority === 2) {
            return '#ed5565';
          }

          if (priority === 1) {
            return '#edae67';
          }

          return '#1ab394';
        })(),
        border: 'none',
      }),
      indicatorSeparator: () => ({ display: 'none' }),
      indicatorsContainer: (provided) => ({
        ...provided,
        maxHeight: '26px',
      }),
      singleValue: (provided) => ({
        ...provided,
        color: '#fff',
        fontWeight: 'bold',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: '#fff',
      }),
    }),
    [priority, disabled],
  );

  return (
    <Select
      id={`bid-priority-${bidId}`}
      name="priority"
      onChange={onChange}
      disabled={disabled}
      options={BidService.PRIORITY_OPTIONS}
      value={priority}
      onBlur={onBlur}
      styles={selectStyles}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
    />
  );
}

BidPriorityTag.propTypes = {
  bidId: PropTypes.number.isRequired,
  priority: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
};

BidPriorityTag.defaultProps = {
  onChange: () => null,
  onBlur: () => null,
  onMenuOpen: () => null,
  onMenuClose: () => null,
  disabled: false,
};

export default BidPriorityTag;
