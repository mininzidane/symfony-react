/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';
import StringService from 'frontend/js/lib/utils/StringService';
import BidStatusFormattedMessage from 'frontend/js/views/Shared/BidStatusFormattedMessage';
import useStyles from './useStyles';

function BidStatusCell({ bidStatus }) {
  const translationKey = StringService.getStatusKeyFormString(bidStatus);
  const classes = useStyles({ theme: translationKey });

  return (
    <div className={classes.root}>
      <BidStatusFormattedMessage bidStatus={bidStatus} />
    </div>
  );
}

export { BidStatusCell };
