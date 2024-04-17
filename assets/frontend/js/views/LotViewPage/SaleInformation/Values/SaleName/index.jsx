/* eslint-disable react/prop-types */
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';

function SaleName({ lot }) {
  if (isEmpty(lot.saleLocation)) {
    return null;
  }

  const { getRoute } = RouterService;
  const { saleLocation } = lot;
  const params = {
    sale_location_id: saleLocation.catalogSourceId || saleLocation.id,
  };

  if (lot.saleDate) {
    const d = new Date(lot.saleDate);
    const month = `0${d.getMonth() + 1}`.slice(-2);

    params.sale_date = `${d.getFullYear()}${month}${d.getDate()}`;
  }

  return (
    <Link href={getRoute('searchResults', params)} isTargetBlank>
      {lot.saleLocation.name}
    </Link>
  );
}

export default SaleName;
