import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

const { VAT_RATE_POLAND } = ShippingOrderService;

export default [
  { label: 'Bremerhaven', value: 'bremerhaven', rate: VAT_RATE_POLAND.bremerhaven },
  { label: 'Rotterdam', value: 'rotterdam', rate: VAT_RATE_POLAND.rotterdam },
  { label: 'Gdynia', value: 'gdynia', rate: VAT_RATE_POLAND.gdynia },
  { label: 'Classic Car', value: 'classicCar', rate: VAT_RATE_POLAND.classicCar },
];
