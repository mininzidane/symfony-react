import React from 'react';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import WatchlistControl from 'frontend/js/views/Shared/WatchlistControl';
import Card from '../../LotPageCard';
import CardIndentedContent from '../../LotPageCard/CardIndentedContent';
import LotPageBlock from '../../LotPageBlock';
import useStyles from './useStyles';

function UpcomingState({ lot }) {
  const classes = useStyles();
  const { id: lotId, isWatched, inventoryAuction } = lot;

  return (
    <LotPageBlock>
      <Card id="lot-page-bid-info-card" title={<FormattedMessage id="shared.label.bidInformation" />}>
        <CardIndentedContent className={classes.container}>
          <FormattedMessage id="lotPage.bidInformation.upcomingMessage" />

          <CardIndentedContent className={classes.action}>
            <WatchlistControl id={lotId} isActive={isWatched} auction={inventoryAuction} hasLabel />
          </CardIndentedContent>
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

UpcomingState.propTypes = {
  lot: LotShape.isRequired,
};

export default UpcomingState;
