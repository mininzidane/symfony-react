import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import VehicleCalculator from 'frontend/js/views/Shared/VehicleCalculator';
import { SHIPPING_WIDGET_ID } from 'frontend/js/views/LotViewPage/ShippingPromo/Content/constants';
import BootstrapService from 'frontend/js/api/BootstrapService';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import LotPageBlock from '../LotPageBlock';
import LoadingState from './LoadingState';

function VehicleCalculatorBlock({ lot }) {
  if (!lot || lot.FAKE) {
    return <LoadingState />;
  }

  const isMandatoryInsurance = BootstrapService.getAppValue('isMandatoryInsurance', true);
  const { id, inventoryAuction, vehicleType, vehicleCategory } = lot;

  return (
    <LotPageBlock>
      <Card title={<FormattedMessage id="lotPage.vehicleCalculator.title" />} id={SHIPPING_WIDGET_ID}>
        <CardIndentedContent>
          <VehicleCalculator
            key={id}
            defaultValues={{ lotIdOrVin: id, auction: inventoryAuction, vehicleType, vehicleCategory }}
            config={{
              input: {
                price: true,
                lotIdOrVin: false,
                auctionLocationId: true,
                vehicleType: false,
                countryId: true,
                destinationId: true,
                USPortId: true,
                insurance: isMandatoryInsurance,
              },
              receipt: {
                price: true,
                fees: true,
                shipping: true,
                insurance: isMandatoryInsurance,
                unlimitedAuctionStorage: isMandatoryInsurance,
                electricFee: true,
                countryRates: true,
                subTotal: true,
              },
              preorder: false,
            }}
          />
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

VehicleCalculatorBlock.defaultProps = {
  lot: null,
};

VehicleCalculatorBlock.propTypes = {
  lot: LotShape,
};

export default VehicleCalculatorBlock;
