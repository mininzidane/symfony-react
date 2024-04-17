/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import Image from 'frontend/js/components/Image';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import { useAllPhotosModalContext } from 'frontend/js/context/AllPhotosModal';
import useStyles from './useStyles';

function LotImage({ lot }) {
  const { id, slug, sold, largeImage, description, searchHash } = lot;
  const [{ setCurrentLot }] = useAllPhotosModalContext();
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper();
  const href = RouterService.getRoute('lot', { openModalGallery: true, searchHash }, false, { id, slug });

  function handleLinkClick() {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
    }
  }

  function handleViewClick() {
    setCurrentLot(lot);
  }

  return (
    <div className={classes.image}>
      <a href={isAuthenticated ? href : undefined} onClick={handleLinkClick}>
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

      <button type="button" className={classes.viewAll} onClick={handleViewClick}>
        <FormattedMessage id="homePage.reviews.viewAll" />
      </button>
    </div>
  );
}

export default LotImage;
