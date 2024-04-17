/* eslint-disable react/prop-types */
import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';

function ConsignmentDetails({ consignment }) {
  if (!consignment) {
    return null;
  }

  const classes = useStyles();
  const intl = useIntl();
  const { copartLot, year, make, model, lotStatus } = consignment;

  return (
    <div className={classes.root}>
      <div className="mb-4">
        {intl.formatMessage({ id: 'shared.label.lotId' })}{' '}
        <strong>
          {copartLot} - {year} {make} {model}
        </strong>
      </div>
      <div>
        {intl.formatMessage({ id: 'shared.label.status' })}: <strong>{lotStatus}</strong>
      </div>
    </div>
  );
}

export default ConsignmentDetails;
