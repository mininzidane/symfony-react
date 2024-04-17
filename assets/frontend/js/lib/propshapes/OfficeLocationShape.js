import PropTypes from 'prop-types';

const countryShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  iso_2: PropTypes.string,
  iso_3: PropTypes.string,
});

const stateShape = PropTypes.shape({
  code: PropTypes.string,
  name: PropTypes.string,
});

const socialContactsShape = PropTypes.shape({
  email: PropTypes.string,
  viber: PropTypes.string,
  whatsapp: PropTypes.string,
  brokerUrl: PropTypes.string,
});

const OfficeLocationShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  textNumber: PropTypes.string,
  country: countryShape,
  state: stateShape,
  address: PropTypes.string,
  localizedAddress: PropTypes.object,
  city: PropTypes.string,
  zip: PropTypes.string,
  socialContacts: socialContactsShape,
  officeHours: PropTypes.string,
  headquarters: PropTypes.bool,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
});

export default OfficeLocationShape;
