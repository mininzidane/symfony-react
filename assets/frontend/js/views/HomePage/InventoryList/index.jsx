import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import get from 'lodash/get';
import classnames from 'classnames';
import { useQuery } from 'react-query';
import CatalogService from 'frontend/js/api/CatalogService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import AdbutlerAdvertisement from 'frontend/js/components/AdbutlerAdvertisement';
import GoogleAd from 'frontend/js/components/GoogleAd';
import LinksGroup from './LinksGroup';
import useStyles from './useStyles';

function Inventory() {
  const classes = useStyles();
  const { data, isLoading } = useQuery('inventory-data', () => CatalogService.getInventory());

  const popular = get(data, 'popular', []);
  const featured = get(data, 'featured', []);
  const types = get(data, 'types', []);
  const bodyStyles = get(data, 'bodyStyles', []);
  const damageTypes = get(data, 'damageTypes', []);

  return (
    <ContainerFullScreen
      className={classnames(classes.root, { 'is-loading': isLoading })}
      background={{ color: '#fff' }}
    >
      <SectionTitle text={<FormattedMessage id="homePage.inventory.title" className={classes.title} />} />

      <div className={classes.grid}>
        <div className={classes.linkContainer}>
          {!isLoading && (
            <>
              <LinksGroup data={popular} title={<FormattedMessage id="homePage.inventory.popularMakes" />} />
              <LinksGroup data={featured} title={<FormattedMessage id="homePage.inventory.featuredItems" />} />
              <LinksGroup data={types} title={<FormattedMessage id="homePage.inventory.vehicleTypes" />} />
              <LinksGroup data={bodyStyles} title={<FormattedMessage id="homePage.inventory.bodyStyles" />} />
              <LinksGroup data={damageTypes} title={<FormattedMessage id="homePage.inventory.damageTypes" />} />
            </>
          )}
        </div>

        <div>
          <AdbutlerAdvertisement id="519498" />
          <GoogleAd
            id="div-gpt-ad-1670281979963-0"
            className="mt-20 mb-20 ta-c"
            withSlot
            adUnitPath="/93216436/ABM-Home-Sidebar-250x360-320x100"
            desktopSize={[250, 360]}
            mobileSize={[320, 100]}
          />
        </div>
      </div>
    </ContainerFullScreen>
  );
}

export default Inventory;
