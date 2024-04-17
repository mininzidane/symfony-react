/* eslint-disable react/prop-types */
import React from 'react';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function SoldViewDetailsButton({ href, onSoldViewDetailsClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <strong className={classes.label}>
        <FormattedMessage id="lotPage.relatedVehicles.lotCard.sold" />
      </strong>

      <ButtonOutlined
        href={href}
        onClick={onSoldViewDetailsClick}
        size="sm"
        color="blue"
        label={<FormattedMessage id="shared.cta.viewDetails" />}
        className={classes.button}
        isCapitalize
        isThinBorder
      />
    </div>
  );
}

export default SoldViewDetailsButton;
