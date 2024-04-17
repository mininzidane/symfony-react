/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PaymentService from 'frontend/js/api/PaymentService';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import useStyles from './useStyles';

function WireTransferDescription() {
  const [downloadUrl, setDownloadUrl] = useState(null);

  const classes = useStyles();
  const { payload } = useCheckoutContext();

  async function getWireTransferData() {
    try {
      const paymentMethod = {
        payment: {
          method: PaymentService.METHOD.WIRE_TRANSFER,
        },
      };
      const data = await PaymentService.wireTransferPayment({ ...paymentMethod, ...payload });

      setDownloadUrl(data?.invoiceUrl);
    } catch (e) {
      /* */
    }
  }

  useEffect(() => {
    getWireTransferData();
  }, []);

  return (
    <ButtonOutlined
      label={<FormattedMessage id="checkoutPage.paymentMethods.wireTransfer.step1button" />}
      href={downloadUrl}
      className={classes.root}
      isDisabled={!downloadUrl}
      isTargetBlank
    />
  );
}

export default WireTransferDescription;
