import InstantOfferService from 'frontend/js/api/InstantOfferService';
import PassengerSideFrontAngleSvg from './img/passenger-side-front-angle.svg';
import DriverSideFrontAngleSvg from './img/driver-side-front-angle.svg';
import DriverSideRearAngleSvg from './img/driver-side-rear-angle.svg';
import PassengerSideRearAngleSvg from './img/passenger-side-rear-angle.svg';
import PassengerFrontInteriorSvg from './img/passenger-front-interior.svg';
import PassengerSideRearInteriorSvg from './img/passenger-side-rear-interior.svg';
import InteriorSvg from './img/interior.svg';
import OpenHoodEngineSvg from './img/open-hood-engine.svg';
import OdometerSvg from './img/odometer.svg';
import VinSvg from './img/vin.svg';
import OptionalVideoSvg from './img/optional-video.svg';

const { CAR_PHOTO_KEYS } = InstantOfferService;

const cards = [
  {
    num: 1,
    id: CAR_PHOTO_KEYS.PASSENGER_SIDE_FRONT_ANGLE,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.passengerSideFrontAngle',
    placeholder: PassengerSideFrontAngleSvg,
  },
  {
    num: 2,
    id: CAR_PHOTO_KEYS.DRIVER_SIDE_FRONT_ANGLE,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.driverSideFrontAngle',
    placeholder: DriverSideFrontAngleSvg,
  },
  {
    num: 3,
    id: CAR_PHOTO_KEYS.DRIVER_SIDE_REAR_ANGLE,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.driverSideRearAngle',
    placeholder: DriverSideRearAngleSvg,
  },
  {
    num: 4,
    id: CAR_PHOTO_KEYS.PASSENGER_SIDE_REAR_ANGLE,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.passengerSideRearAngle',
    placeholder: PassengerSideRearAngleSvg,
  },

  {
    num: 5,
    id: CAR_PHOTO_KEYS.PASSENGER_FRONT_INTERIOR,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.passengerFrontInterior',
    placeholder: PassengerFrontInteriorSvg,
  },

  {
    num: 6,
    id: CAR_PHOTO_KEYS.PASSENGER_SIDE_REAR_INTERIOR,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.passengerSideRearInterior',
    placeholder: PassengerSideRearInteriorSvg,
  },

  {
    num: 7,
    id: CAR_PHOTO_KEYS.INTERIOR,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.interior',
    placeholder: InteriorSvg,
  },

  {
    num: 8,
    id: CAR_PHOTO_KEYS.OPEN_HOOD_ENGINE,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.openHoodEngine',
    placeholder: OpenHoodEngineSvg,
  },
  {
    num: 9,
    id: CAR_PHOTO_KEYS.ODOMETER,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.odometer',
    placeholder: OdometerSvg,
  },
  {
    num: 10,
    id: CAR_PHOTO_KEYS.VIN,
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.vin',
    placeholder: VinSvg,
  },
  {
    num: 11,
    id: 'optional-video',
    titleTranslationKey: 'sellYourCarPage.upload.carPhotos.optionalVideo',
    placeholder: OptionalVideoSvg,
    accept: 'video/*',
    maxSize: 500 * 1024 * 1024,
    isVideo: true,
  },
];

export default cards;
