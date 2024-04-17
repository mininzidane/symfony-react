/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import PaymentService from 'frontend/js/api/PaymentService/';
import ZelleLogo from './Logos/ZelleLogo';
import ACHLogo from './Logos/ACHLogo';
import WireTransferLogo from './Logos/WireTransferLogo';
import FedExLogo from './Logos/FedExLogo';
import useStyles from './useStyles';

function PayMethodCard({ name, payMethod, value, onChange }) {
  const classes = useStyles();
  const { WIRE_TRANSFER, ZELLE, ACH, CHECK_BY_FEDEX } = PaymentService.METHOD;
  const isChecked = payMethod === value;

  function handleClick() {
    if (!isChecked) {
      onChange(name, payMethod);
    }
  }

  return (
    <button type="button" className={classnames(classes.root, isChecked && 'is-checked')} onClick={handleClick}>
      <div className={classes.circle} />
      <div className={classes.label}>
        {payMethod === ZELLE && 'Zelle Payment'}
        {payMethod === ACH && 'ACH Payment'}
        {payMethod === WIRE_TRANSFER && 'Wire Payment'}
        {payMethod === CHECK_BY_FEDEX && 'Check by FedEx'}
      </div>
      <div className={classes.logo}>
        {payMethod === ZELLE && <ZelleLogo isColored className={classes.zelle} />}
        {payMethod === ACH && <ACHLogo isColored className={classes.ach} />}
        {payMethod === WIRE_TRANSFER && <WireTransferLogo isColored className={classes.wireTransfer} />}
        {payMethod === CHECK_BY_FEDEX && <FedExLogo isColored className={classes.fedex} />}
      </div>
    </button>
  );
}

export default PayMethodCard;
