/* eslint-disable react/prop-types */
import React from 'react';
import Loader from 'frontend/js/views/Shared/Loader';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ItemsPerPageControl from 'frontend/js/components/Pagination/ItemsPerPageControl';
import SnackbarProvider from 'frontend/js/providers/SnackbarProvider';
import { AllPhotosModalProvider } from 'frontend/js/context/AllPhotosModal';
import NoResultsState from '../Shared/NoResultsState';
import useB2bLotsWon from './useB2bLotsWon';
import PageContent from './PageContent';
import Filters from '../Shared/Filters';
import Tags from '../Shared/Tags';
import Controls from './Controls';
import useNoteStats from './useNoteStats';
import useStyles from './useStyles';

function Purchases({ handleCountUpdate }) {
  const classes = useStyles();
  const { loading, invoices, bidders, dateRanges, total } = useB2bLotsWon(handleCountUpdate);
  const { noteStats, isLoading: isNoteStatsLoading } = useNoteStats(invoices);

  const notEmptyData = invoices.length > 0;

  return (
    <AllPhotosModalProvider>
      <SnackbarProvider>
        <div className={classes.root}>
          <Filters hasViewToggle />

          <Controls bidders={bidders} dateRanges={dateRanges} />

          <div className={classes.titleWrap}>
            <h1 className={classes.title}>
              <FormattedMessage id="transactionsPage.purchases" /> ({total})
            </h1>

            <ItemsPerPageControl withHistoryAPI />
          </div>

          <div className={classes.mobileWrap}>
            <Tags bidders={bidders} dateRanges={dateRanges} />
          </div>

          {loading && <Loader />}

          {!loading &&
            (notEmptyData ? (
              <PageContent invoices={invoices} noteStats={noteStats} isNoteStatsLoading={isNoteStatsLoading} />
            ) : (
              <NoResultsState type="lotsWon" />
            ))}
        </div>
      </SnackbarProvider>
    </AllPhotosModalProvider>
  );
}

Purchases.propTypes = {};

export default Purchases;
