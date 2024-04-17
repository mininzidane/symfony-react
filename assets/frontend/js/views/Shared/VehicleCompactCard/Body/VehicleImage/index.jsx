/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Image from 'frontend/js/components/Image';
import Placeholder from './Placeholder';
import useStyles from './useStyles';

function VehicleImage({ lot }) {
  if (!lot) {
    return <Placeholder />;
  }

  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper();

  const { id, slug, sold, largeImage, description, searchHash } = lot;

  const href = RouterService.getRoute(
    'lot',
    {
      searchHash,
    },
    false,
    { id, slug },
  );

  return (
    <a href={href} className={classes.root}>
      <Image
        ratio={75}
        src={largeImage}
        className={classes.root}
        isBlurred={!isAuthenticated && sold}
        fallback
        lazy
        alt={description}
      />

      <div className={classes.viewAll}>
        <FormattedMessage id="homePage.reviews.viewAll" />
      </div>
    </a>
  );
}

export default VehicleImage;
