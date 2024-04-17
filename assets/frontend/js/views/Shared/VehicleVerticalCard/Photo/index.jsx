/* eslint-disable react/prop-types */
import React from 'react';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';
import Gallery from './Gallery';
import Placeholder from './Placeholder';
import useStyles from './useStyles';

function VehicleVerticalCardPhoto({ lot, noCarousel }) {
  if (!lot) {
    return <Placeholder />;
  }

  const { isAuthenticated } = useCustomerHelper();
  const { description, images, sold, largeImage, id, slug, searchHash } = lot;
  const classes = useStyles();

  return (
    <Link
      className={classes.root}
      href={RouterService.getRoute(
        'lot',
        {
          searchHash,
        },
        false,
        { id, slug },
      )}
    >
      <Gallery
        title={description}
        images={images}
        image={largeImage}
        isBlurred={!isAuthenticated && sold}
        noCarousel={noCarousel}
      />
    </Link>
  );
}

export default VehicleVerticalCardPhoto;
