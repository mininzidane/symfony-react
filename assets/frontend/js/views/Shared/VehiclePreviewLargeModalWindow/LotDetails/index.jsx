/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Card from 'frontend/js/views/LotViewPage/LotPageCard';
import CardIndentedContent from 'frontend/js/views/LotViewPage/LotPageCard/CardIndentedContent';
import Properties from 'frontend/js/views/LotViewPage/LotDetails/Properties';
import ClearVinBanner from 'frontend/js/views/LotViewPage/LotDetails/ClearVinBanner';
import VinDetails from 'frontend/js/views/LotViewPage/LotDetails/VinDetails';
import useStyles from './useStyles';

function LotDetails({ lot }) {
  const classes = useStyles();

  return (
    <Card title={<FormattedMessage id="shared.label.lotIdDetails" values={{ id: lot.id }} />} className={classes.root}>
      <ClearVinBanner lot={lot} className={classes.clearVin} />

      <CardIndentedContent className={classes.content}>
        <Properties lot={lot} isShortList />

        {lot.vinDecodeAvailable && (
          <div className={classes.vinDetailsRow}>
            <VinDetails lot={lot} />
          </div>
        )}
      </CardIndentedContent>
    </Card>
  );
}

export default LotDetails;
