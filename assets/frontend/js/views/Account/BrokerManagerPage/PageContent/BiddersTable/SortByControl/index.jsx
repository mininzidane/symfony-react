import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';
import SortBy from 'frontend/js/components/SortBy';
import useStyles from './useStyles';

function SortByControl({ onChange, sort }) {
  const intl = useIntl();
  const classes = useStyles();

  function f(id) {
    return intl.formatMessage({ id });
  }

  return (
    <SortBy
      value={sort}
      isFlipEnabled={false}
      triggerClassName={classes.root}
      options={[
        {
          label: `${f('shared.label.date')} (${f('shared.label.sort.date.desc')})`,
          field: 'sign_up',
          order: 'desc',
        },
        {
          label: `${f('shared.label.date')} (${f('shared.label.sort.date.asc')})`,
          field: 'sign_up',
          order: 'asc',
        },
        {
          label: `${f('shared.label.name')} (${f('shared.label.sort.alphabetic.asc')})`,
          field: 'full_name',
          order: 'asc',
        },
        {
          label: `${f('shared.label.name')} (${f('shared.label.sort.alphabetic.desc')})`,
          field: 'full_name',
          order: 'desc',
        },
        {
          label: `${f('shared.label.buyerPower')} (${f('shared.label.sort.number.desc')})`,
          field: 'bl_amount',
          order: 'desc',
        },
        {
          label: `${f('shared.label.buyerPower')} (${f('shared.label.sort.number.asc')})`,
          field: 'bl_amount',
          order: 'asc',
        },
        {
          label: `${f('shared.label.currentBids')} (${f('shared.label.sort.number.desc')})`,
          field: 'current_bids',
          order: 'desc',
        },
        {
          label: `${f('shared.label.currentBids')} (${f('shared.label.sort.number.asc')})`,
          field: 'current_bids',
          order: 'asc',
        },
        {
          label: `${f('shared.label.wonBids')} (${f('shared.label.sort.number.desc')})`,
          field: 'won_bids',
          order: 'desc',
        },
        {
          label: `${f('shared.label.wonBids')} (${f('shared.label.sort.number.asc')})`,
          field: 'won_bids',
          order: 'asc',
        },
        {
          label: `${f('shared.label.status')} (${f('shared.label.sort.status.asc')})`,
          field: 'status',
          order: 'asc',
        },
        {
          label: `${f('shared.label.status')} (${f('shared.label.sort.status.desc')})`,
          field: 'status',
          order: 'desc',
        },
      ]}
      onChange={onChange}
    />
  );
}

SortByControl.propTypes = {
  onChange: PropTypes.func.isRequired,
  sort: PropTypes.shape({ field: PropTypes.string, order: PropTypes.string }).isRequired,
};

export default SortByControl;
