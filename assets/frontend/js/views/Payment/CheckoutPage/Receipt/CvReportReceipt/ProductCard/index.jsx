/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function ProductCard({ vehicleDescription, vin, lotId, slug, value }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.row}>
          <FormattedMessage id="receiptPage.clearVinReportFor" />
        </div>
        <div className={classes.row}>{vehicleDescription}</div>
        {vin && (
          <div className={classes.row}>
            <FormattedMessage id="shared.label.vinId" />: {vin}
          </div>
        )}
        <div className={classes.row}>
          <FormattedMessage id="shared.label.lotId" />:{' '}
          <Link href={RouterService.getRoute('lot', null, false, { id: lotId, slug })}>{lotId}</Link>
        </div>
      </div>

      <strong>{value}</strong>
    </div>
  );
}

export default ProductCard;
