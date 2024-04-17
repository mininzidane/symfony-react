/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import Image from 'frontend/js/components/Image';
import Placeholder from './Placeholder';
import useStyles from './useStyles';

const VehicleImageCellStyles = { style: { padding: '2px' } };

function VehicleImageCell({ lot, src }) {
  if (!lot) {
    return <Placeholder />;
  }

  const classes = useStyles();
  const { id, slug, sold, largeImage, description, searchHash } = lot;
  const { isAuthenticated } = useCustomerHelper();
  const href = RouterService.getRoute(
    'lot',
    {
      searchHash,
    },
    false,
    { id, slug },
  );
  const [{ setCurrentLotId, setIsModalOpen }] = usePreviewModalContext();

  const handleQuickViewClick = useCallback(() => {
    setCurrentLotId(id);
    setIsModalOpen(true);
  }, []);

  return (
    <div className={classes.root}>
      <a href={href}>
        <Image
          ratio={75}
          src={src || largeImage}
          className={classes.root}
          isBlurred={!isAuthenticated && sold}
          fallback
          lazy
          alt={description}
        />
      </a>

      <button type="button" className={classes.quickView} onClick={handleQuickViewClick}>
        <FormattedMessage id="shared.cta.quickView" />
      </button>
    </div>
  );
}

export { VehicleImageCell, VehicleImageCellStyles };
