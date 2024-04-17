/* eslint-disable react/prop-types */
import React from 'react';
import ButtonLink from 'backend/js/components/ButtonLink';
import ClearVinButton from 'backend/js/views/_Shared/ClearVinButton';
import CopyButton from 'backend/js/components/CopyButton';
import classnames from 'classnames';
import CVLogo from '../img/cv-circle.svg';
import useStyles from './useStyles';

function VIN({ lot, className, shippingOrder }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.vinRow, className)}>
      VIN: {shippingOrder?.vin ? shippingOrder.vin : lot.vin}
      <CopyButton value={shippingOrder?.vin ? shippingOrder.vin : lot.vin} />
      <ClearVinButton
        lotId={shippingOrder?.lotNumber ? shippingOrder.lotNumber : lot.id}
        inventoryAuction={shippingOrder?.auction ? shippingOrder.auction : lot.inventoryAuction}
        component={({ onClick, ...props }) => (
          <ButtonLink
            className="ml-5"
            label={<img src={CVLogo} alt="CV Logo" width="16px" height="16px" />}
            onClick={onClick}
            {...props}
          />
        )}
      />
    </div>
  );
}

export default VIN;
