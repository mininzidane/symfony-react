/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function ConsignmentDetails({ consignment }) {
  if (!consignment) {
    return null;
  }

  const classes = useStyles();
  const { copartLot, year, make, model, lotStatus } = consignment;

  return (
    <div className={classes.root}>
      <div>
        Lot#{' '}
        <strong>
          {copartLot} - {year} {make} {model}
        </strong>
      </div>
      <div>
        Status: <strong>{lotStatus}</strong>
      </div>
    </div>
  );
}

export default ConsignmentDetails;
