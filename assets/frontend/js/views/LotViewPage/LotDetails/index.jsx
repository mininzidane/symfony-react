/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotService from 'frontend/js/api/LotService';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import Properties from './Properties';
import IaaProperties from './IaaProperties';
import VinDetails from './VinDetails';
import ClearVinBanner from './ClearVinBanner';
import LotPageBlock from '../LotPageBlock';
import useStyles from './useStyles';

function LotDetails({ lot }) {
  const classes = useStyles();
  const { inventoryAuction } = lot;
  const isIaaAuction = inventoryAuction === LotService.AUCTION_IAA;

  return (
    <LotPageBlock>
      <Card
        title={<FormattedMessage id="shared.label.lotIdDetails" values={{ id: lot.id }} />}
        className={classes.root}
      >
        <ClearVinBanner lot={lot} className={classes.clearVin} />
        <CardIndentedContent className={classes.content}>
          {isIaaAuction ? (
            <>
              <IaaProperties lot={lot} />
            </>
          ) : (
            <>
              <Properties lot={lot} />
            </>
          )}

          {lot.vinDecodeAvailable && (
            <div className={classes.vinDetailsRow}>
              <VinDetails lot={lot} />
            </div>
          )}
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

export default LotDetails;
