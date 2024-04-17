/* eslint-disable react/prop-types */
import React from 'react';

function Badges({ lotPurchase }) {
  return (
    <div>
      {lotPurchase.ca2CaPurchase && <span className="badge mt-5 mr-5">CA2CA</span>}

      {lotPurchase.fl2Fl && <span className="badge mt-5 mr-5">FL2FL</span>}

      {lotPurchase.junkTitle && <span className="badge mt-5 mr-5">Junk Title</span>}

      {lotPurchase.activeShippingOrder && lotPurchase.activeShippingOrder.internationalType && (
        <span className="badge mt-5 mr-5">EH</span>
      )}

      {lotPurchase.export && <span className="badge mt-5 mr-5">Export</span>}

      {lotPurchase.flExport && <span className="badge mt-5 mr-5">FL Export</span>}

      {lotPurchase.consignment && <span className="badge badge-danger mt-5 mr-5">Consignment</span>}

      {lotPurchase.aventura && <span className="badge mt-5 mr-5">Aventura</span>}

      {lotPurchase.overnightTitle && <span className="badge mt-5 mr-5">Overnight</span>}

      {lotPurchase.signatureRequired && <span className="badge mt-5 mr-5">Signature required</span>}
    </div>
  );
}

export default Badges;
