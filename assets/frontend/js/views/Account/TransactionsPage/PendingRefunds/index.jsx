import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import PendingRefundsBlock from 'frontend/js/views/Account/_Shared/PendingRefundsBlock';
import useStyles from './useStyles';
import NoResults from '../NoResults';

function PendingRefunds() {
  const classes = useStyles();

  return (
    <PendingRefundsBlock
      noResults={<NoResults content={<FormattedMessage id="transactionsPage.refunds.noResults" />} />}
      loader={
        <div className={classes.loaderContainer}>
          <SpinnerWheel isCentered size={40} thickness={3} />
        </div>
      }
    />
  );
}

export default PendingRefunds;
