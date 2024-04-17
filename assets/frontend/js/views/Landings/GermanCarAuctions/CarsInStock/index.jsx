/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from 'react-query';
import SearchService from 'frontend/js/api/SearchService';
import CarsInStock from 'frontend/js/views/Landings/Shared/CarsInStock';
import FormattedMessage from 'frontend/js/components/FormattedMessage';

function CarsInStockSection() {
  const { data } = useQuery(['german_inventory'], () => SearchService.getDeInventory(), {
    staleTime: Infinity,
    keepPreviousData: true,
  });

  const { lots } = data || {};

  return <CarsInStock lots={lots} title={<FormattedMessage id="germanCarAuctionsPage.carsInStock.title" />} />;
}

export default CarsInStockSection;
