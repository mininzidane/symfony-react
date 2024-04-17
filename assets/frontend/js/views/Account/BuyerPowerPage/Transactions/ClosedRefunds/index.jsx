import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ClosedTransactionsBlock from 'frontend/js/views/Account/_Shared/ClosedTransactionsBlock';
import EmptyCard from '../EmptyCard';
import LoadingStateCard from '../LoadingStateCard';
import useStyles from '../useStyles';

function ClosedRefunds() {
  const classes = useStyles();

  return (
    <div className={classes.tableWrap} style={{ minHeight: 300 }}>
      <ClosedTransactionsBlock
        loader={<LoadingStateCard />}
        noResults={
          <EmptyCard
            title={<FormattedMessage id="depositsPage.transactions.closedRefunds.empty.title" />}
            subtitle={<FormattedMessage id="depositsPage.transactions.closedRefunds.empty.subtitle" />}
          />
        }
        className={classes.tableContainer}
      />
    </div>
  );
}

export default ClosedRefunds;
