/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { useQuery } from 'react-query';
import LotsSuggestionCarousel from 'frontend/js/views/Shared/LotsSuggestionCarousel';
import SearchService from 'frontend/js/api/SearchService';
import RouterService from 'frontend/js/api/RouterService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function CarsInStock({ iso2, countryName }) {
  const classes = useStyles();
  const [isMounted, setIsMounted] = useState(false);
  const query = RouterService.serializeQueryParams({ lounge: iso2 });
  const { data: lots } = useQuery(['lounge_inventory'], () => SearchService.getLoungeInventory(query), {
    staleTime: Infinity,
    keepPreviousData: true,
    // replace saleDate to hide specific row on LotsSuggestionCarousel
    select: (data) => (data.lots || []).map((l) => ({ ...l, saleDate: true })),
  });

  if (!lots?.length) {
    return null;
  }

  return (
    <div ref={() => setIsMounted(true)} className={classes.root}>
      <div className={classes.container}>
        <div className={classes.toolbar}>
          <h2 className={classes.label}>
            <FormattedMessage id="loungePage.carsInStock.title" values={{ country: countryName }} />
          </h2>
          <div id="controls" className={classes.controls} />
        </div>

        {isMounted && (
          <>
            {lots.length > 0 && (
              <LotsSuggestionCarousel controlsElementId="controls" lots={lots} analytics={{}} hideBid />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CarsInStock;
