import React from 'react';
import Loader from 'frontend/js/views/Shared/Loader';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import { SortProvider } from 'frontend/js/context/SortContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import BrokerManagerContextProvider from './_Context';
import Caption from './Caption';
import PageContent from './PageContent';
import useStyles from './useStyles';
import useBidders from './useBidders';
import brokerManagerSortOptions from './brokerManagerSortOptions';

function BrokerManagerPage() {
  const classes = useStyles();
  const [bidders, isBiddersLoading] = useBidders();
  const {
    brokerAllowToSetFixedBP: allowToSetFixedBP,
    brokerAllowToAddTowingMarkup: allowToAddTowingMarkup,
    brokerAllowToChooseSchedule: allowToChooseSchedule,
  } = useCustomerHelper();

  return (
    <div className={classes.root}>
      <Caption hasBidders={bidders.length > 0} />

      {isBiddersLoading ? (
        <Loader />
      ) : (
        <PageContent
          allowToAddTowingMarkup={allowToAddTowingMarkup}
          bidders={bidders}
          allowToSetFixedBP={allowToSetFixedBP}
          allowToChooseSchedule={allowToChooseSchedule}
        />
      )}
    </div>
  );
}

export default () => (
  <BrokerManagerContextProvider>
    <PaginationProvider>
      <SortProvider options={brokerManagerSortOptions}>
        <BrokerManagerPage />
      </SortProvider>
    </PaginationProvider>
  </BrokerManagerContextProvider>
);
