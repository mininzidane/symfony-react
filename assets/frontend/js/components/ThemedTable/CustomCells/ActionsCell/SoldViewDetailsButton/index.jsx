/* eslint-disable react/prop-types */
import React from 'react';
import BidService from 'frontend/js/api/BidService';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import { BidStatusCell } from 'frontend/js/components/ThemedTable/CustomCells/BidStatusCell';
import useStyles from './useStyles';

function SoldViewDetailsButton({ href, onClick, bidStatus }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {bidStatus && bidStatus !== BidService.STATUS_YOU_HAVENT_BID ? (
        <BidStatusCell bidStatus={bidStatus} />
      ) : (
        <FormattedMessage id="lotPage.relatedVehicles.lotCard.sold" className={classes.label} />
      )}

      <ButtonOutlined
        href={href}
        onClick={onClick}
        size="sm"
        color="blue"
        label={<FormattedMessage id="shared.cta.viewDetails" />}
        className={classes.button}
        fontWeight={600}
        isCapitalize
        isThinBorder
      />
    </div>
  );
}

export default SoldViewDetailsButton;
