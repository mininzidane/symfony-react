/* eslint-disable react/prop-types */
import React from 'react';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ModalWindowContainer from 'frontend/js/components/ModalWindow/Container';
import useStyles from '../useStyles';

function SuccessText({ lot }) {
  const classes = useStyles();
  const { email } = useCustomerHelper();

  const { vin, description } = lot;

  return (
    <ModalWindowContainer className={classes.infoText}>
      <strong>
        <FormattedMessage id="clearvinReport.purchase.success" values={{ vehicle: description }} />
      </strong>
      <br />
      <strong>
        <FormattedMessage id="shared.label.vin" />: {vin}
      </strong>

      <div style={{ marginTop: 12 }}>
        <FormattedMessage id="clearvinReport.purchase.reportIsReady" values={{ email }} />
      </div>
    </ModalWindowContainer>
  );
}

export default SuccessText;
