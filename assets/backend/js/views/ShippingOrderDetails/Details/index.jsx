import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import Bol from '../Bol';
import Bos from '../Bos';
import WireConfirmation from '../WireConfirmation';
import Documents from '../Documents';
import Pictures from '../Pictures';

function Details({ id }) {
  const [order, setOrder] = useState(null);
  const shippingOrderService = ShippingOrderService;

  useEffect(() => {
    shippingOrderService.getOrderDetails(id).then(({ order: details }) => {
      setOrder(details);
    });
  }, []);

  if (!order) {
    return null;
  }

  return (
    <ThemeProvider>
      <div className="col-md-12">
        <Pictures orderId={id} documents={order.pictures} />
        <Bos orderId={id} documents={order.bos ? order.bos : []} />
        <Bol documents={order.bill_of_lading ? [order.bill_of_lading] : []} />
        <WireConfirmation orderId={id} documents={order.wire_confirmation_files ? order.wire_confirmation_files : []} />
        <Documents documents={order.documents} />
      </div>
    </ThemeProvider>
  );
}

Details.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Details;
