import React from 'react';
import { useQuery } from 'react-query';

import { Redirect, useParams } from 'react-router-dom';

import AuctionService from 'frontend/js/api/AuctionService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';

import RouterService from 'frontend/js/api/RouterService';

import GoogleAd from 'frontend/js/components/GoogleAd';
import HeroSection from './HeroSection';
import Details from './Details';
import FormSection from './FormSection';
import NearLocations from './NearLocations';
import Vehicles from './Vehicles';

import prefetch from './prefetch';
import useStyles from './useStyles';

function LocationsDetailsPage() {
  const { slug } = useParams();
  const classes = useStyles();

  const { data = {}, isLoading } = useQuery(['location_details', slug], () =>
    AuctionService.getAuctionLocationDetails(slug),
  );

  if (isLoading) {
    return (
      <div className="pos-r strut">
        <SpinnerWheel isCentered size={40} thickness={3} />
      </div>
    );
  }

  if (data.status === '404') {
    return <Redirect to={RouterService.getRoute('locations')} />;
  }

  const { location = {}, lots, totalLots } = data;
  const locationName = location.name.split(' - ')[1];

  return (
    <div className={classes.root}>
      <HeroSection location={location} locationName={locationName} />
      <ContainerFullScreen className={classes.container}>
        <FormSection location={location} />
        <Details location={location} locationName={locationName} />
        <GoogleAd
          id="div-gpt-ad-1379078-2"
          className="mt-10 width-xl-728 width-sm-300"
          placement="location_details_bottom_1"
          withSlot
          adUnitPath="/93216436/ABM-Ad3-728*90"
          targetsArray={['page_spot', ['bottom_1']]}
          pubTargetsArray={['page', ['location_event_date_pages']]}
        />
        <Vehicles lots={lots} total={totalLots} location={location} locationName={locationName} />
        <NearLocations />
      </ContainerFullScreen>
    </div>
  );
}

LocationsDetailsPage.prefetch = prefetch;

export default LocationsDetailsPage;
