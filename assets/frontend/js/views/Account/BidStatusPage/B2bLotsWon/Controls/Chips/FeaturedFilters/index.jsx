import React, { useContext } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import FiltersContext from 'frontend/js/views/Account/BidStatusPage/Shared/_Context/Filters';
import RouterService from 'frontend/js/api/RouterService';
import Chip from './Chip';

function FeaturedFilters() {
  const { filters, setFilters } = useContext(FiltersContext);
  const intl = useIntl();

  const OPTIONS = [
    { label: intl.formatMessage({ id: 'shared.label.toBePaid' }), value: 'to_be_paid' },
    { label: intl.formatMessage({ id: 'shared.label.toBePickedUp' }), value: 'to_be_picked_up' },
    { label: intl.formatMessage({ id: 'shared.label.atWarehouse' }), value: 'at_warehouse' },
    { label: intl.formatMessage({ id: 'shared.label.sailing' }), value: 'sailing' },
    { label: intl.formatMessage({ id: 'shared.label.delivered' }), value: 'delivered' },
    { label: intl.formatMessage({ id: 'shared.label.awaitingTitle' }), value: 'awaiting_title' },
  ];

  function handleDelete(filter) {
    setFilters(
      (value) => {
        const lotFilters = typeof value.lotFilters === 'undefined' ? [] : value.lotFilters.split(',');
        lotFilters.splice(lotFilters.indexOf(filter), 1);

        return {
          ...value,
          lotFilters: lotFilters.join(','),
        };
      },
      (value) => {
        RouterService.addQueryParams({ lotFilters: value.lotFilters || undefined }, { pushToHistory: true });
      },
    );
  }

  function handleAdd(filter) {
    setFilters(
      (value) => {
        const lotFilters = typeof value.lotFilters === 'undefined' ? [] : value.lotFilters.split(',');
        lotFilters.push(filter);

        return {
          ...value,
          lotFilters: lotFilters.join(','),
        };
      },
      (value) => {
        RouterService.addQueryParams({ lotFilters: value.lotFilters }, { pushToHistory: true });
      },
    );
  }

  const isActive = (filter) => filters.lotFilters?.includes(filter);

  return OPTIONS.map((filter) => (
    <Chip
      key={filter.value}
      label={filter.label}
      onClick={() => handleAdd(filter.value)}
      onDelete={() => handleDelete(filter.value)}
      isActive={isActive(filter.value)}
    />
  ));
}

export default FeaturedFilters;
