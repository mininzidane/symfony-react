import PropTypes from 'prop-types';

const CustomerShape = PropTypes.shape({
  id: PropTypes.number,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.shape({
    id: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
  }),
  country: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    iso_2: PropTypes.string,
  }),
  zip: PropTypes.string,
  phoneNumber: PropTypes.string,
  mobilePhone: PropTypes.string,
  mobilePhoneValidated: PropTypes.bool,
  membershipType: PropTypes.shape({
    level: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    upgradable: PropTypes.bool,
  }),
  membershipValidity: PropTypes.string,
  membershipAutoRenewal: PropTypes.bool,
  blAmount: PropTypes.number,
  blCount: PropTypes.number,
  blUsedAmount: PropTypes.number,
  blUsedCount: PropTypes.number,
  cvCredits: PropTypes.number,
  username: PropTypes.string,
  metaInformation: PropTypes.shape({
    autocharge_bidding_account: PropTypes.bool,
    autocharge_services: PropTypes.bool,
    autocharge_clearvin: PropTypes.bool,
  }),
  zipDetails: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      zip: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.string,
        name: PropTypes.string,
      }),
      country: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        iso_2: PropTypes.string,
      }),
      lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ]),
  isParentAdmin: PropTypes.bool,
  activeBidsCount: PropTypes.number,
  activeShippingOrdersCount: PropTypes.number,
  signUp: PropTypes.string,
});

export default CustomerShape;
