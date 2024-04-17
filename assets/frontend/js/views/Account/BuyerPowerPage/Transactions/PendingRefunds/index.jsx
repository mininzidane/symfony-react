import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PendingRefundsBlock from 'frontend/js/views/Account/_Shared/PendingRefundsBlock';
import EmptyCard from '../EmptyCard';
import useStyles from '../useStyles';
import LoadingStateCard from '../LoadingStateCard';

function PendingRefunds() {
  const classes = useStyles();

  return (
    <div className={classes.tableWrap} style={{ minHeight: 300 }}>
      <PendingRefundsBlock
        loader={<LoadingStateCard />}
        noResults={
          <EmptyCard
            title={<FormattedMessage id="depositsPage.transactions.pendingRefunds.empty.title" />}
            subtitle={<FormattedMessage id="depositsPage.transactions.pendingRefunds.empty.subtitle" />}
          />
        }
        className={classes.tableContainer}
      />
    </div>
  );
}

export default PendingRefunds;
