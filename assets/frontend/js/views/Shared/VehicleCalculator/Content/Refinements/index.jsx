import React, { useContext } from 'react';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import PriceAtAuction from './PriceAtAuction';
import VehicleCategory from './VehicleCategory';
import AuctionLocation from './AuctionLocation';
import ShippingToCountry from './ShippingToCountry';
import ShippingDestination from './ShippingDestination';
import ShippingFromUSPort from './ShippingFromUSPort';
import Lot from './Lot';
import useStyles from './useStyles';

function Refinements() {
  const classes = useStyles();
  const { config } = useContext(CalculatorContext);
  const { input } = config;

  return (
    <div className={classes.root}>
      {input.lotIdOrVin && <Lot />}
      {input.price && <PriceAtAuction />}
      {input.vehicleCategory && <VehicleCategory />}
      {input.auctionLocationId && <AuctionLocation />}
      {input.countryId && <ShippingToCountry />}
      {input.destinationId && <ShippingDestination />}
      {input.USPortId && <ShippingFromUSPort />}
    </div>
  );
}

export default Refinements;
