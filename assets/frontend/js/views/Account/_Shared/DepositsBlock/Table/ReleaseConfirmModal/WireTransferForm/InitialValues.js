const { customer } = window;

const InitialValues = {
  swiftCode: '',
  ibanNumber: '',
  account: '',
  city: customer.city || '',
  state: (customer.state && customer.state.name) || '',
  zipCode: customer.zip || '',
  country: (customer?.country?.id || '').toString(),
  intlRoutingCode: '',
};

export default InitialValues;
