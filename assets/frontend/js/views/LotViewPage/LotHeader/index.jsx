/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useWatchlist from 'frontend/js/hooks/useWatchlist';
import Headline from '../Headline';
import Breadcrumbs from './Breadcrumbs';
import Navigation from './Navigation';
import useStyles from './useStyles';

function LotHeader({ className, lot, seo, locale, isInventory, isNpa }) {
  if (!lot) {
    return null;
  }

  const { isActive } = useWatchlist(lot);
  const { isAuthenticated } = useCustomerHelper();
  const classes = useStyles();
  const isSelect = !isActive && lot.copartSelect;
  const isAbmInventory = !isActive && isInventory;
  const isNpaInventory = !isActive && isNpa;
  const breadcrumbs = seo?.breadcrumbs;

  return (
    <div
      className={classnames(
        classes.root,
        {
          'is-watched': isActive,
          'is-select': isSelect,
          'is-abm-inventory': isAbmInventory,
          'is-npa-inventory': isNpaInventory,
        },
        className,
      )}
    >
      <ContainerFullScreen>
        <Breadcrumbs
          lot={lot}
          isSelect={isSelect}
          breadcrumbs={breadcrumbs}
          isAbmInventory={isAbmInventory}
          isNpaInventory={isNpaInventory}
        />
        <div className={classes.grid}>
          <div className={classes.titleSection}>
            <Headline
              lot={lot}
              seo={seo}
              isAuthenticated={isAuthenticated}
              locale={locale}
              isSelect={isSelect}
              isAbmInventory={isAbmInventory}
              isNpaInventory={isNpaInventory}
            />
          </div>

          <Navigation lot={lot} isSelect={isSelect} isAbmInventory={isAbmInventory} isNpaInventory={isNpaInventory} />
        </div>
      </ContainerFullScreen>
    </div>
  );
}

export default LotHeader;
