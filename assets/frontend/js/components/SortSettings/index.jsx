import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import Select from 'frontend/js/components/Select';
import CheckMarkSvg from 'frontend/images/shared/various/checkmark-blue.svg';
import useStyles from './useStyles';

function SortSettings({ value, onChange, options, trigger, isFlipEnabled, placement, renderLabel }) {
  const classes = useStyles();
  const [isAsc, setIsAsc] = useState(true);
  const [order, setOrder] = useState('asc');

  const selectedValue = value.field;
  const triggerLabel = options.find((v) => v.field === value.field)?.label;

  function handleChange(field) {
    onChange({ field, order });
  }

  function handleButtonClick() {
    setIsAsc(!isAsc);
  }

  useEffect(() => {
    setOrder(isAsc ? 'asc' : 'desc');
  }, [isAsc]);

  useEffect(() => {
    onChange({ field: value.field, order });
  }, [order]);

  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <FormattedMessage id="shared.cta.sortBy" />:
      </div>

      <Select
        placement={placement}
        isFlipEnabled={isFlipEnabled}
        classes={{ listItem: classes.listItem }}
        trigger={trigger({ label: triggerLabel })}
        onChange={handleChange}
        selected={selectedValue}
        offsetTop={2}
        options={options
          .filter((option) => option.order === 'asc')
          .map(({ label, field }) => ({
            label: (
              <div className={classes.option}>
                {renderLabel(label)}
                <img
                  src={CheckMarkSvg}
                  alt="Selected"
                  style={{ visibility: field === value.field ? 'visible' : 'hidden' }}
                />
              </div>
            ),
            value: field,
          }))}
      />

      <button type="button" onClick={handleButtonClick} className={classnames(classes.sortButton, { 'is-asc': isAsc })}>
        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" width="5" height="1" fill="#2158F5" />
          <rect x="5" width="13" height="0.999999" transform="rotate(90 5 0)" fill="#2158F5" />
          <path d="M0.5 9L4.5 13L8.5 9" stroke="#2158F5" />
          <rect x="10" y="6" width="7" height="1" fill="#2158F5" />
          <rect x="10" y="12" width="9" height="1" fill="#2158F5" />
        </svg>
      </button>
    </div>
  );
}

SortSettings.defaultProps = {
  placement: 'bottom-end',
  isFlipEnabled: true,
  renderLabel: (v) => v,
  trigger: null,
};

SortSettings.propTypes = {
  value: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
      field: PropTypes.string,
      order: PropTypes.string,
    }),
  ).isRequired,
  isFlipEnabled: PropTypes.bool,
  placement: PropTypes.string,
  renderLabel: PropTypes.func,
  trigger: PropTypes.func,
};

export default SortSettings;
