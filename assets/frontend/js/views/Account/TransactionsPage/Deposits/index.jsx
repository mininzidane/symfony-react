import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import DepositsBlock from 'frontend/js/views/Account/_Shared/DepositsBlock';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Alert from '../Alert';
import useStyles from './useStyles';
import NoResults from '../NoResults';

function Deposits() {
  const classes = useStyles();

  return (
    <>
      <Alert text={<FormattedMessage id="transactionsPage.deposits.alert" />} />
      <DepositsBlock
        onReleaseSuccess={() => {}}
        className={classes.table}
        noResults={<NoResults content={<FormattedMessage id="transactionsPage.deposits.noResults" />} />}
        loader={
          <div className={classes.loaderContainer}>
            <SpinnerWheel isCentered size={40} thickness={3} />
          </div>
        }
      />
    </>
  );
}

export default Deposits;
