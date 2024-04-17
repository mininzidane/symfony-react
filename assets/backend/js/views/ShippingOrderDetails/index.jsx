import ReactDOM from 'react-dom';
import React from 'react';
import Details from './Details';
import Consignee from './Consignee';

const $shippingOrderDetails = document.getElementById('shipping-order-details');
const id = parseInt($shippingOrderDetails.getAttribute('data-order-id'), 10);
ReactDOM.render(<Details id={id} />, $shippingOrderDetails);

const $consignees = document.querySelectorAll('.consignee-container');
$consignees.forEach(($consignee) => {
  const orderId = parseInt($consignee.getAttribute('data-order-id'), 10);
  const consignee = $consignee.getAttribute('data-consignee');
  ReactDOM.render(<Consignee id={orderId} consignee={consignee} />, $consignee);
});
