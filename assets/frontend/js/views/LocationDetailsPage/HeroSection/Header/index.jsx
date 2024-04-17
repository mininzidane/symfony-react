/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import LotService from 'frontend/js/api/LotService';
import RouterService from 'frontend/js/api/RouterService';
import Breadcrumbs from 'frontend/js/views/Shared/PageSections/Breadcrumbs';
import useStyles from './useStyles';

function Header({ locationName, location }) {
  const classes = useStyles();
  const { country, stateName } = location;
  const crumbs = [
    { label: <FormattedMessage id="header.main_menu.vehicle_finder" />, href: RouterService.getRoute('searchResults') },
    { label: <FormattedMessage id="header.main_menu.locations" />, href: RouterService.getRoute('locations') },
    country?.name ? { label: country?.name } : null,
    stateName ? { label: stateName } : null,
    { label: locationName },
  ].filter(Boolean);

  return (
    <div className={classes.root}>
      <div className={classes.crumbsWrap}>
        <Breadcrumbs crumbs={crumbs} className={classes.crumbs} />
      </div>
      <h1 className={classes.title}>
        <FormattedMessage id="locationDetailsPage.header.title" values={{ location: locationName }} />
      </h1>
      <p className={classes.subtitle}>
        <FormattedMessage
          id="locationDetailsPage.header.subtitle"
          values={{
            auction: location.inventoryAuction
              ? LotService[`AUCTION_${location.inventoryAuction.toUpperCase()}`]
              : LotService.AUCTION_COPART,
            city: location.city,
          }}
        />
      </p>
    </div>
  );
}

export default Header;
