import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import useAuctionLocations from 'frontend/js/hooks/useAuctionLocations';
import LotService from 'frontend/js/api/LotService';
import Refinement from '../Refinement';

function AuctionLocation() {
  const intl = useIntl();
  const { refinements, refine, values } = useContext(CalculatorContext);
  const { lot } = values;
  const { auctionLocationId } = refinements;
  const auctionLocations = useAuctionLocations(lot ? lot.inventoryAuction : LotService.AUCTION_COPART);
  const isDisabled = Boolean(lot);

  function handleChange(_, v) {
    refine({ auctionLocationId: v, USPortId: null });
  }

  return (
    <Refinement
      label={<FormattedMessage id="vehicleCalculator.refinement.auctionLocation" />}
      input={
        <SelectPlane
          onChangeAttribute="id"
          onChange={handleChange}
          isSearchable
          id="auctionLocationId"
          name="auctionLocationId"
          options={[...auctionLocations].sort((a, b) => String(a.name).localeCompare(String(b.name)))}
          value={auctionLocationId}
          formatOptionLabel={(option) => option.name}
          convertMobileSelectValue={parseInt}
          isNativeLabelDisabled={false}
          nativeLabel={intl.formatMessage({ id: 'vehicleCalculator.refinement.auctionLocation' })}
          disabled={isDisabled}
        />
      }
    />
  );
}

export default AuctionLocation;
