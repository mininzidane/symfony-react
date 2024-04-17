/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Filters from 'frontend/js/views/Account/BidStatusPage/Shared/Filters';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useEventListener from 'frontend/js/hooks/useEventListener';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Chips from './Chips';
import DownloadReport from './DownloadReport';
import useStyles from './useStyles';

function Controls({ bidders, dateRanges }) {
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const classes = useStyles();
  const { isAboveMd } = useBreakpoint();

  const { isB2BBroker } = useCustomerHelper();
  useEventListener('resize', () => setWidth(document.documentElement.clientWidth));

  return (
    <div className={classes.root} style={{ width, marginLeft: `calc(50% - ${width * 0.5}px)` }}>
      <Chips bidders={bidders} dateRanges={dateRanges} />

      <div className={classes.right}>
        {isAboveMd && <Filters hasTime hasSearchByLotVin bidders={bidders} dateRanges={dateRanges} absolute={false} />}

        {isB2BBroker && <DownloadReport />}
      </div>
    </div>
  );
}

export default Controls;
