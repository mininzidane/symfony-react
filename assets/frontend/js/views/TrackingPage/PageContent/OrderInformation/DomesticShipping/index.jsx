import React from 'react';
import PropTypes from 'prop-types';
import CardPlane from 'frontend/js/components/CardPlane';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import VehiclePhotos from '../VehiclePhotos';
import useOrderInformation from '../useOrderInformation';

function DomesticShipping({ shippingOrder }) {
  const { auctionImages, vehicle } = useOrderInformation(shippingOrder);

  return (
    <CardPlane title={<FormattedMessage id="trackingPage.label.auctionImages" />}>
      <VehiclePhotos
        images={auctionImages}
        title={vehicle}
        downloadAllLink={shippingOrder.downloadAllAuctionPicturesUrl}
      />
    </CardPlane>
  );
}

DomesticShipping.defaultProps = {
  shippingOrder: null,
};

DomesticShipping.propTypes = {
  shippingOrder: PropTypes.object,
};

export default DomesticShipping;
