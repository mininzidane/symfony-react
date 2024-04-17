/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import t from 'frontend/js/api/TranslatorService';
import React, { createContext, useState, useEffect } from 'react';
import useEventListener from 'frontend/js/hooks/useEventListener';
import RouterService from 'frontend/js/api/RouterService';

const SortContext = createContext();

function SortProvider({ children }) {
  const OPTIONS = [
    {
      label: `${t('shared.label.saleDate')} (${t('shared.label.sort.event.asc')})`,
      field: 'sale_date',
      order: 'asc',
    },
    {
      label: `${t('shared.label.saleDate')} (${t('shared.label.sort.event.desc')})`,
      field: 'sale_date',
      order: 'desc',
    },
    {
      label: `${t('shared.label.year')} (${t('shared.label.sort.date.asc')})`,
      field: 'year',
      order: 'asc',
    },
    {
      label: `${t('shared.label.year')} (${t('shared.label.sort.date.desc')})`,
      field: 'year',
      order: 'desc',
    },
    {
      label: `${t('shared.label.mileage')} (${t('shared.label.sort.number.asc')})`,
      field: 'odometer',
      order: 'asc',
    },
    {
      label: `${t('shared.label.mileage')} (${t('shared.label.sort.number.desc')})`,
      field: 'odometer',
      order: 'desc',
    },
    {
      label: `${t('shared.label.currentBid')} (${t('shared.label.sort.number.asc')})`,
      field: 'high_bid',
      order: 'asc',
    },
    {
      label: `${t('shared.label.currentBid')} (${t('shared.label.sort.number.desc')})`,
      field: 'high_bid',
      order: 'desc',
    },

    // table options
    { field: 'id', order: 'asc', isTableOption: true },
    { field: 'id', order: 'desc', isTableOption: true },
    { field: 'location', order: 'asc', isTableOption: true },
    { field: 'location', order: 'desc', isTableOption: true },
    { field: 'doc_type', order: 'asc', isTableOption: true },
    { field: 'doc_type', order: 'desc', isTableOption: true },
    { field: 'primary_damage', order: 'asc', isTableOption: true },
    { field: 'primary_damage', order: 'desc', isTableOption: true },
  ];

  function getSortFromURL() {
    const fieldParam = RouterService.getQueryParam('sort');
    const orderParam = RouterService.getQueryParam('order');

    if (fieldParam && orderParam) {
      const sortOption = OPTIONS.find((option) => option.field === fieldParam && option.order === orderParam);

      if (sortOption) {
        return sortOption;
      }
    }

    return OPTIONS[0];
  }

  const [sort, setSort] = useState(getSortFromURL());

  useEffect(() => {
    const { field, order } = sort;

    RouterService.addQueryParams({ sort: field, order }, { replaceState: true });
  }, [sort]);

  useEventListener('popstate', () => {
    setSort(getSortFromURL());
  });

  return <SortContext.Provider value={{ sortOptions: OPTIONS, sort, setSort }}>{children}</SortContext.Provider>;
}

export { SortProvider };

export default SortContext;
