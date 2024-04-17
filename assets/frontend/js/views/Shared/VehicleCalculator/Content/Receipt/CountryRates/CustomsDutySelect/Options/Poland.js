import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

const { CUSTOMS_DUTY_RATE_POLAND, CUSTOMS_DUTY_TYPES } = ShippingOrderService;

export default [
  { label: 'Car', value: CUSTOMS_DUTY_TYPES.CAR, rate: CUSTOMS_DUTY_RATE_POLAND[CUSTOMS_DUTY_TYPES.CAR] },
  { label: 'Truck', value: CUSTOMS_DUTY_TYPES.TRUCK, rate: CUSTOMS_DUTY_RATE_POLAND[CUSTOMS_DUTY_TYPES.TRUCK] },
  {
    label: 'Motorcycle',
    value: CUSTOMS_DUTY_TYPES.MOTORCYCLE,
    rate: CUSTOMS_DUTY_RATE_POLAND[CUSTOMS_DUTY_TYPES.MOTORCYCLE],
  },
  {
    label: 'Boat/Jet Ski',
    value: CUSTOMS_DUTY_TYPES.BOAT_AND_JET_SKI,
    rate: CUSTOMS_DUTY_RATE_POLAND[CUSTOMS_DUTY_TYPES.BOAT_AND_JET_SKI],
  },
  {
    label: 'Classic Car',
    value: CUSTOMS_DUTY_TYPES.CLASSIC_CAR,
    rate: CUSTOMS_DUTY_RATE_POLAND[CUSTOMS_DUTY_TYPES.CLASSIC_CAR],
  },
];
