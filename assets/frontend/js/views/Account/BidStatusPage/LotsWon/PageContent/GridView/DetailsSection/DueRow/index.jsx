import React from 'react';
import Row from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Row';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Amount from 'frontend/js/components/Amount';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import useStyles from './useStyles';

function DueRow() {
  const classes = useStyles();

  const { amount, invoice } = useLotWonContext();
  const { paid } = invoice;

  return (
    <Row
      condition
      label={<FormattedMessage id="shared.label.due" />}
      value={<Amount value={paid ? 0 : parseFloat(amount, 10)} hasCurrency fontSize={18} />}
      className={classes.due}
    />
  );
}

export default DueRow;
