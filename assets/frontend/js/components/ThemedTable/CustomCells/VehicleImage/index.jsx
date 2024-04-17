/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Image from 'frontend/js/components/Image';
import useStyles from './useStyles';

const VehicleImageCellStyles = { style: { padding: '2px' } };

function VehicleImageCell({ lot, className }) {
  const classes = useStyles();
  const { id, slug, sold, largeImage, description, searchHash } = lot;
  const { isAuthenticated } = useCustomerHelper();
  const href = RouterService.getRoute('lot', { searchHash }, false, { id, slug });

  return (
    <div className={classnames(classes.root, className)}>
      <a href={href}>
        <Image
          ratio={75}
          src={largeImage}
          className={classes.image}
          isBlurred={!isAuthenticated && sold}
          fallback
          lazy
          alt={description}
        />
      </a>
    </div>
  );
}

export { VehicleImageCell, VehicleImageCellStyles };
