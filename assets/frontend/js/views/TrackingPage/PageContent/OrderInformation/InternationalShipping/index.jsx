import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import CardPlane from 'frontend/js/components/CardPlane';
import TabsContainer from 'frontend/js/components/Tabs/TabsContainer';
import TabsToolbar from 'frontend/js/components/Tabs/TabsToolbar';
import Tab from 'frontend/js/components/Tabs/Tab';
import TabContent from 'frontend/js/components/Tabs/TabContent';
import VehiclePhotos from '../VehiclePhotos';
import useOrderInformation from '../useOrderInformation';
import useStyles from './useStyles';

function InternationalShipping({ shippingOrder }) {
  const intl = useIntl();
  const classes = useStyles();
  const { auctionImages, pickUpImages, warehouseImages, vehicle, unloadingImages } = useOrderInformation(shippingOrder);

  const isPickUpImages = pickUpImages.length > 0;
  const isWarehouseImages = warehouseImages.length > 0;
  const isAuctionImages = auctionImages.length > 0;
  const isUnloadingImages = unloadingImages.length > 0;

  const tabsCount = [isPickUpImages, isWarehouseImages, isAuctionImages, isUnloadingImages].reduce(
    (count, tab) => (tab ? count + 1 : count),
    0,
  );

  if (!tabsCount) {
    return null;
  }

  const getDefaultTab = () => {
    if (isWarehouseImages) {
      return 'warehouseImages';
    }
    if (isPickUpImages) {
      return 'pickUpImages';
    }
    if (isUnloadingImages) {
      return 'unloadingImages';
    }
    return 'auctionImages';
  };

  const tabsToolbarClasses = {
    flexContainer: classes.flexContainer,
    indicator: classes.indicator,
  };

  function getFormattedImages(images) {
    return images && images.map((photo) => ({ full: photo.url, thumbnail: photo.url, mimeType: photo.mime_type }));
  }

  const tabTitlesMap = {
    auctionImages: intl.formatMessage({ id: 'trackingPage.label.auctionImages' }),
    pickUpImages: intl.formatMessage({ id: 'trackingPage.label.pickUpImages' }),
    warehouseImages: intl.formatMessage({ id: 'trackingPage.label.warehouseImages' }),
    isUnloadingImages: intl.formatMessage({ id: 'trackingPage.label.unloadingImages' }),
  };

  return (
    <CardPlane title={tabsCount === 1 ? tabTitlesMap[getDefaultTab()] : null}>
      {tabsCount > 1 ? (
        <div>
          <TabsContainer defaultTab={getDefaultTab()}>
            <div className={classes.tabsWrap}>
              <TabsToolbar classes={tabsToolbarClasses} variant="fullWidth">
                {isAuctionImages && (
                  <Tab
                    value="auctionImages"
                    className={classes.tab}
                    label={intl.formatMessage({ id: 'trackingPage.label.auctionImages' })}
                  />
                )}
                {isPickUpImages && (
                  <Tab
                    value="pickUpImages"
                    className={classes.tab}
                    label={intl.formatMessage({ id: 'trackingPage.label.pickUpImages' })}
                  />
                )}
                {isWarehouseImages && (
                  <Tab
                    value="warehouseImages"
                    className={classes.tab}
                    label={intl.formatMessage({ id: 'trackingPage.label.warehouseImages' })}
                  />
                )}
                {isUnloadingImages && (
                  <Tab
                    value="unloadingImages"
                    className={classes.tab}
                    label={intl.formatMessage({ id: 'trackingPage.label.unloadingImages' })}
                  />
                )}
              </TabsToolbar>
            </div>

            <TabContent id="auctionImages">
              <VehiclePhotos
                images={auctionImages}
                title={vehicle}
                downloadAllLink={shippingOrder.downloadAllAuctionPicturesUrl}
              />
            </TabContent>

            <TabContent id="pickUpImages">
              <VehiclePhotos
                images={getFormattedImages(pickUpImages)}
                title={vehicle}
                downloadAllLink={shippingOrder.downloadAllPickupPicturesUrl}
              />
            </TabContent>

            <TabContent id="warehouseImages">
              <VehiclePhotos
                images={getFormattedImages(warehouseImages)}
                title={vehicle}
                downloadAllLink={shippingOrder.downloadAllWarehousePicturesUrl}
              />
            </TabContent>

            <TabContent id="unloadingImages">
              <VehiclePhotos images={getFormattedImages(unloadingImages)} title={vehicle} />
            </TabContent>
          </TabsContainer>
        </div>
      ) : (
        <div>
          {isAuctionImages && (
            <VehiclePhotos
              images={auctionImages}
              title={vehicle}
              downloadAllLink={shippingOrder.downloadAllAuctionPicturesUrl}
            />
          )}
          {isPickUpImages && (
            <VehiclePhotos
              images={getFormattedImages(pickUpImages)}
              title={vehicle}
              downloadAllLink={shippingOrder.downloadAllPickupPicturesUrl}
            />
          )}
          {isWarehouseImages && (
            <VehiclePhotos
              images={getFormattedImages(warehouseImages)}
              title={vehicle}
              downloadAllLink={shippingOrder.downloadAllWarehousePicturesUrl}
            />
          )}
        </div>
      )}
    </CardPlane>
  );
}

InternationalShipping.defaultProps = {
  shippingOrder: null,
};

InternationalShipping.propTypes = {
  shippingOrder: PropTypes.object,
};

export default InternationalShipping;
