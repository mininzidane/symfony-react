const { customer } = window;
let customerName = '';

if (customer && customer.firstName) {
  customerName += `${customer.firstName} `;
}

if (customer && customer.lastName) {
  customerName += `${customer.lastName}`;
}

const InitialValues = {
  name: customerName,
  address: customer.address || '',
  city: customer.city || '',
  state: (customer.state && customer.state.id) || '',
  zip_code: customer.zip || '',
};

export default InitialValues;
