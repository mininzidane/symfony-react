import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';
import SelectCategory from 'frontend/js/components/SelectCategory';
import useStyles from './useStyles';

function StatusSelect({ onChange, status }) {
  const intl = useIntl();
  const classes = useStyles();

  const options = [
    {
      label: `${intl.formatMessage({ id: 'watchlistPage.tab.currentAuctions' })}`,
      value: 'current',
    },
    {
      label: `${intl.formatMessage({ id: 'watchlistPage.tab.completedAuctions' })}`,
      value: 'completed',
    },
  ];

  return (
    <SelectCategory
      placement="bottom-start"
      isFlipEnabled={false}
      triggerClassName={classes.root}
      triggerLabelClassName={classes.triggerLabel}
      triggerDesc={intl.formatMessage({ id: 'shared.label.status' })}
      onChange={(value) => onChange(value)}
      selectedOption={options.find((option) => option.value === status)}
      options={options}
    />
  );
}

StatusSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default StatusSelect;
