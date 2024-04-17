/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PaymentService from 'frontend/js/api/PaymentService';
import MoneyGramSvg from 'frontend/images/shared/payment-services/moneygram-single-line.svg';
import ZelleSvg from 'frontend/images/shared/payment-services/zelle-short.svg';
import WireTransferIconSvg from 'frontend/images/shared/payment-services/wire-transfer-icon.svg';
import useStyles from './useStyles';

function Header({ method }) {
  const classes = useStyles();

  const methodIconMap = {
    [PaymentService.METHOD.MONEYGRAM]: MoneyGramSvg,
    [PaymentService.METHOD.ZELLE]: ZelleSvg,
    [PaymentService.METHOD.WIRE_TRANSFER]: WireTransferIconSvg,
  };

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage id="shared.cta.payWith" />
      </div>
      <img src={methodIconMap[method]} className={method.toLowerCase()} alt="logo" />
    </div>
  );
}

Header.propTypes = {};

export default Header;
