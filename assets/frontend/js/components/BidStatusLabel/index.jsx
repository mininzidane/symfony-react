/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';
import StringService from 'frontend/js/lib/utils/StringService';
import BidStatusFormattedMessage from 'frontend/js/views/Shared/BidStatusFormattedMessage';
import useStyles from './useStyles';

function BidStatusLabel({ bidStatus, isWrap, isSmall }) {
  const classes = useStyles({
    theme: StringService.getStatusKeyFormString(bidStatus),
    whiteSpace: isWrap ? null : 'nowrap',
    isSmall,
  });

  return (
    <div className={classes.root}>
      <BidStatusFormattedMessage bidStatus={bidStatus} />
    </div>
  );
}

export default BidStatusLabel;
