import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import ArrowTopSvg from './img/ic_arrow.svg';
import useStyles from './useStyles';

function DepositIncreaseNotice() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormattedMessage
        id="receiptPage.depositIncreaseNotice"
        className={classes.message}
        values={{ minDeposit: BuyerPowerService.minDepositAmount }}
      />
      <img src={ArrowTopSvg} className={classes.icon} width="28" height="17" alt="Warning" />
    </div>
  );
}

export default DepositIncreaseNotice;
