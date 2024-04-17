/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import ButtonLink from 'frontend/js/components/ButtonLink';
import LocationCards from 'frontend/js/views/Shared/LocationsCards';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useLocationsByCoordinates from 'frontend/js/views/LocationsPage/useLocationsByCoordinates';
import LotService from 'frontend/js/api/LotService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import AuctionService from 'frontend/js/api/AuctionService';
import useNearLocations from 'frontend/js/views/LocationsPage/useNearLocations';
import useStyles from './useStyles';

const ChangeLocationPopupLazy = React.lazy(() => import('frontend/js/views/LocationsPage/ChangeLocationPopup'));

function NearLocations() {
  const { lat, lng, currentLocationSlug, setManualLocation } = useNearLocations();
  const classes = useStyles();
  const isAvailableAuctionCopartDe = BootstrapService.isAvailableAuction(AuctionService.AUCTIONS.COPART_DE);
  const [isOpened, setOpen] = useState(false);
  const auction = [LotService.AUCTION_COPART, isAvailableAuctionCopartDe ? LotService.AUCTION_COPART_DE : null]
    .filter(Boolean)
    .join(',')
    .toLowerCase();
  const { data: nearLocations } = useLocationsByCoordinates(auction, lat, lng);

  return (
    <>
      <LocationCards
        containerClassName={classes.root}
        cardClassName={classes.card}
        scrollContainerClassName={classes.scrollContainer}
        locations={nearLocations.slice(0, 5)}
        title={
          <>
            <FormattedMessage id="locationsPage.near.title" className={classes.h2} />
            <FormattedMessage
              id="locationsPage.near.desc"
              values={{ location: <ButtonLink onClick={() => setOpen(true)} label={currentLocationSlug} /> }}
            />
          </>
        }
      />
      <SuspenseWrap init={isOpened} fallback={null}>
        <ChangeLocationPopupLazy
          isOpened={isOpened}
          onClose={() => setOpen(false)}
          onResponse={(location) => {
            setManualLocation(location);
            setOpen(false);
          }}
        />
      </SuspenseWrap>
    </>
  );
}

export default NearLocations;
