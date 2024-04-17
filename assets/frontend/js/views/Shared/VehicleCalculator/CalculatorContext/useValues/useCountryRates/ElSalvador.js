import get from 'lodash/get';
import LotService from 'frontend/js/api/LotService';

const truckBodyStyles = ['BUS', 'CHASSIS', 'CONVENTIONAL CAB', 'EXTENDED', 'GLIDERS', 'MOTORIZED HOME', 'TRACTOR'];
const vehicle4x4BodyStyles = ['4DR SPORT UTILITY', '2DR SPORT UTILITY'];
const pickupBodyStyles = [
  '3DR EXT CAB PICKUP',
  '4DR EXT CAB PICKUP',
  'CHASSIS AND CAB',
  'CLUB CAB',
  'CREW PICKUP',
  'CREW CHASSIS',
  'PICKUP',
  'SUPER CAB PICKUP',
  'SPORT PICKUP',
];
const allWheelDriveTypes = [
  '4x4 w/Front Whl Drv',
  '4x4 w/Rear Wheel Drv',
  'All wheel drive',
  'REAR WHEEL DRV W/4X4',
  'Four by Four',
];

function getDAIRatio(vehicleCategory, engineCapacity, body) {
  if (LotService.isTruck(vehicleCategory) || truckBodyStyles.includes(body)) {
    return 0.01;
  }

  if (pickupBodyStyles.includes(body)) {
    return 0.05;
  }

  if (vehicle4x4BodyStyles.includes(body)) {
    return 0.25;
  }

  if (engineCapacity >= 2) {
    return 0.3;
  }

  if (engineCapacity >= 1.3) {
    return 0.25;
  }

  return 0.2;
}

function getFirstRegisterRatio(vehicleCategory, engineCapacity, body, driveType) {
  if (LotService.isTruck(vehicleCategory) || truckBodyStyles.includes(body) || pickupBodyStyles.includes(body)) {
    return 0.01;
  }

  if (vehicle4x4BodyStyles.includes(body)) {
    return 0.06;
  }

  if (engineCapacity >= 2 && allWheelDriveTypes.includes(driveType)) {
    return 0.06;
  }

  return 0.04;
}

function calcCustomClearance(params) {
  const E_PAYMENT_FEE = 10;
  const E_PAYMENT_1_REGISTRATION_FEE = 12;
  const E_PAYMENT_X_RAYS_FEE = 18;

  const { refinements, values } = params;
  const { shipping, lot, lotExchangeRate, vehicleCategory } = values;
  const { price } = refinements;
  const { bodyStyle, drive, engineSize } = lot;

  const shippingCost = get(shipping, 'total');
  const priceUSDollars = price / lotExchangeRate;

  const engineCapacity = parseFloat(engineSize);
  const CIF = priceUSDollars + shippingCost + priceUSDollars * 0.035;
  const DAI = CIF * getDAIRatio(vehicleCategory, engineCapacity, bodyStyle);
  const VAT = (CIF + DAI) * 0.13;
  const AVI = CIF * 0.01;
  const FirstRegister =
    (CIF + DAI + VAT + AVI) * getFirstRegisterRatio(vehicleCategory, engineCapacity, bodyStyle, drive);

  return Math.round(
    DAI + VAT + AVI + E_PAYMENT_FEE + E_PAYMENT_1_REGISTRATION_FEE + E_PAYMENT_X_RAYS_FEE + FirstRegister,
  );
}

function calcElSalvadorCustomsRates(params) {
  const customClearance = calcCustomClearance(params);

  return {
    customClearance,
  };
}

export default { calc: calcElSalvadorCustomsRates };
