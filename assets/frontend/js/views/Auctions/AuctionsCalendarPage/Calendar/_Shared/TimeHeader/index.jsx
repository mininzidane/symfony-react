import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useTimeZoneAbbr from 'frontend/js/hooks/useTimeZoneAbbr';
import useStyles from './useStyles';

function TimeHeader() {
  const classes = useStyles();
  const tzAbbrName = useTimeZoneAbbr();

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage id="shared.label.auctionTime" />
      </div>
      <div>{tzAbbrName && <>({tzAbbrName})</>}</div>
    </div>
  );
}

export default TimeHeader;
