import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PurchasesBlock from 'frontend/js/views/Account/_Shared/PurchasesBlock';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Alert from '../Alert';
import useStyles from './useStyles';
import NoResults from '../NoResults';
import WireTransferSvg from './img/wire-transfer.svg';

function Purchases() {
  const classes = useStyles();

  return (
    <>
      <Alert
        text={<FormattedMessage id="transactionsPage.purchases.alert" values={{ br: <br /> }} />}
        icon={<img src={WireTransferSvg} width="48" alt="Wire Transfer" />}
      />
      <PurchasesBlock
        className={classes.table}
        noResults={<NoResults content={<FormattedMessage id="transactionsPage.purchases.noResults" />} />}
        loader={
          <div className={classes.loaderContainer}>
            <SpinnerWheel isCentered size={40} thickness={3} />
          </div>
        }
      />
    </>
  );
}

export default Purchases;
