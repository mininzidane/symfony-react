import { useCallback, useState, useEffect, useContext, useMemo } from 'react';
import t from 'frontend/js/api/TranslatorService';
import RouterService from 'frontend/js/api/RouterService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import PaginationContext from 'frontend/js/context/PaginationContext';
import { useCustomerLocationContext } from 'frontend/js/context/CustomerLocationContext';

const DEFAULT_OPTION_INDEX = 0; // sale date asc
const DEFAULT_LOCATION_OPTION_INDEX = 6; // location distance asc

const OPTIONS = [
  {
    label: { property: t('shared.label.saleDate'), order: `(${t('shared.label.sort.event.asc')})` },
    field: 'sale_date',
    order: 'asc',
  },
  {
    label: { property: t('shared.label.saleDate'), order: `(${t('shared.label.sort.event.desc')})` },
    field: 'sale_date',
    order: 'desc',
  },
  {
    label: { property: t('shared.label.mileage'), order: `(${t('shared.label.sort.number.asc')})` },
    field: 'mileage',
    order: 'asc',
  },
  {
    label: { property: t('shared.label.mileage'), order: `(${t('shared.label.sort.number.desc')})` },
    field: 'mileage',
    order: 'desc',
  },
  {
    label: { property: t('shared.label.year'), order: `(${t('shared.label.sort.date.asc')})` },
    field: 'year',
    order: 'asc',
  },
  {
    label: { property: t('shared.label.year'), order: `(${t('shared.label.sort.date.desc')})` },
    field: 'year',
    order: 'desc',
  },
  {
    label: { property: t('shared.label.locationDistance'), order: `(${t('shared.label.sort.number.asc')})` },
    field: 'location_distance',
    order: 'asc',
  },
  {
    label: { property: t('shared.label.locationDistance'), order: `(${t('shared.label.sort.number.desc')})` },
    field: 'location_distance',
    order: 'desc',
  },
  {
    label: { property: t('shared.label.vehicleCondition'), order: `(${t('shared.label.sort.number.asc')})` },
    field: 'damage',
    order: 'asc',
  },
  {
    label: { property: t('shared.label.vehicleCondition'), order: `(${t('shared.label.sort.number.desc')})` },
    field: 'damage',
    order: 'desc',
  },
  {
    label: { property: t('shared.label.make'), order: `(${t('shared.label.sort.number.asc')})` },
    field: 'make',
    order: 'asc',
  },
  {
    label: { property: t('shared.label.make'), order: `(${t('shared.label.sort.number.desc')})` },
    field: 'make',
    order: 'desc',
  },
  {
    label: { property: t('shared.label.model'), order: `(${t('shared.label.sort.number.asc')})` },
    field: 'model',
    order: 'asc',
  },
  {
    label: { property: t('shared.label.model'), order: `(${t('shared.label.sort.number.desc')})` },
    field: 'model',
    order: 'desc',
  },
  {
    label: { property: t('shared.label.currentBid'), order: `(${t('shared.label.sort.number.asc')})` },
    field: 'current_bid',
    order: 'asc',
  },
  {
    label: { property: t('shared.label.currentBid'), order: `(${t('shared.label.sort.number.desc')})` },
    field: 'current_bid',
    order: 'desc',
  },
  {
    label: { property: t('shared.cta.buyItNow'), order: `(${t('shared.label.sort.number.asc')})` },
    field: 'buy_it_now',
    order: 'asc',
  },
  {
    label: { property: t('shared.cta.buyItNow'), order: `(${t('shared.label.sort.number.desc')})` },
    field: 'buy_it_now',
    order: 'desc',
  },

  // table options
  { field: 'lot_id', order: 'asc', isTableOption: true },
  { field: 'lot_id', order: 'desc', isTableOption: true },
  { field: 'make', order: 'asc', isTableOption: true },
  { field: 'make', order: 'desc', isTableOption: true },
  { field: 'model', order: 'asc', isTableOption: true },
  { field: 'model', order: 'desc', isTableOption: true },
  { field: 'item', order: 'asc', isTableOption: true },
  { field: 'item', order: 'desc', isTableOption: true },
  { field: 'location', order: 'asc', isTableOption: true },
  { field: 'location', order: 'desc', isTableOption: true },
  { field: 'doc_type', order: 'asc', isTableOption: true },
  { field: 'doc_type', order: 'desc', isTableOption: true },
  { field: 'damage', order: 'asc', isTableOption: true },
  { field: 'damage', order: 'desc', isTableOption: true },
  { field: 'est_retail_value', order: 'asc', isTableOption: true },
  { field: 'est_retail_value', order: 'desc', isTableOption: true },
];

function getSortFromURL(location) {
  const fieldParam = RouterService.getQueryParam('sort');
  const orderParam = RouterService.getQueryParam('order');

  if (fieldParam && orderParam) {
    const sortOption = OPTIONS.find((option) => option.field === fieldParam && option.order === orderParam);

    if (sortOption) {
      return sortOption;
    }
  }

  return location ? OPTIONS[DEFAULT_LOCATION_OPTION_INDEX] : OPTIONS[DEFAULT_OPTION_INDEX];
}

function useSort() {
  const { location, loading: locationLoading } = useCustomerLocationContext();
  const { setCurrentPage } = useContext(PaginationContext);
  const [sort, setSort] = useState(getSortFromURL(location));

  const handleChange = useCallback(
    (value) => {
      if (sort.field === value.field && sort.order === value.order) {
        return;
      }

      setSort(value);
      setCurrentPage(1);

      const { field, order } = value || {};
      RouterService.addQueryParams({ sort: field, order, page: 1 }, { pushToHistory: true });
    },
    [sort],
  );

  useEventListener(['popstate', 'init_refinements'], () => {
    setSort(getSortFromURL(location));
  });

  useEffect(() => {
    if (location && !locationLoading) {
      setSort(getSortFromURL(location));
    }
  }, [locationLoading]);

  const options = useMemo(() => {
    if (!location) {
      return OPTIONS.filter((option) => option.field !== 'location_distance');
    }

    return OPTIONS;
  }, [location]);

  return [options, sort, handleChange];
}

export default useSort;
