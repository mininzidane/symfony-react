import t from 'frontend/js/api/TranslatorService';

const OPTIONS = {
  saleDate: [
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
  ],
  year: [
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
  ],
  mileage: [
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
  ],
  currentBid: [
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
  ],

  // table options
  id: [
    { field: 'id', order: 'asc', isTableOption: true },
    { field: 'id', order: 'desc', isTableOption: true },
  ],
  make: [
    { field: 'make', order: 'asc', isTableOption: true },
    { field: 'make', order: 'desc', isTableOption: true },
  ],
  model: [
    { field: 'model', order: 'asc', isTableOption: true },
    { field: 'model', order: 'desc', isTableOption: true },
  ],
  item: [
    { field: 'item', order: 'asc', isTableOption: true },
    { field: 'item', order: 'desc', isTableOption: true },
  ],
  location: [
    { field: 'location', order: 'asc', isTableOption: true },
    { field: 'location', order: 'desc', isTableOption: true },
  ],
  docType: [
    { field: 'doc_type', order: 'asc', isTableOption: true },
    { field: 'doc_type', order: 'desc', isTableOption: true },
  ],
  saleStatus: [
    { field: 'sale_status', order: 'asc', isTableOption: true },
    { field: 'sale_status', order: 'desc', isTableOption: true },
  ],
  bidStatus: [
    { field: 'bid_status', order: 'asc', isTableOption: true },
    { field: 'bid_status', order: 'desc', isTableOption: true },
  ],
  primaryDamage: [
    { field: 'primary_damage', order: 'asc', isTableOption: true },
    { field: 'primary_damage', order: 'desc', isTableOption: true },
  ],
  acv: [
    { field: 'acv', order: 'asc', isTableOption: true },
    { field: 'acv', order: 'desc', isTableOption: true },
  ],
  vehicleStatus: [
    { field: 'vehicle_status', order: 'asc', isTableOption: true },
    { field: 'vehicle_status', order: 'desc', isTableOption: true },
  ],
  shipping: [
    { field: 'shipping', order: 'asc', isTableOption: true },
    { field: 'shipping', order: 'desc', isTableOption: true },
  ],
  due: [
    { field: 'due', order: 'asc', isTableOption: true },
    { field: 'due', order: 'desc', isTableOption: true },
  ],
};

export default OPTIONS;
