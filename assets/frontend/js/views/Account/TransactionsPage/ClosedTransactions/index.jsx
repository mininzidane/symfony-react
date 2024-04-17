import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import ClosedTransactionsBlock from 'frontend/js/views/Account/_Shared/ClosedTransactionsBlock';
import useStyles from './useStyles';
import NoResults from '../NoResults';

function ClosedTransactions() {
  const classes = useStyles();

  return (
    <ClosedTransactionsBlock
      noResults={<NoResults content={<FormattedMessage id="transactionsPage.closed.noResults" />} />}
      loader={
        <div className={classes.loaderContainer}>
          <SpinnerWheel isCentered size={40} thickness={3} />
        </div>
      }
    />
  );
}

export default ClosedTransactions;
