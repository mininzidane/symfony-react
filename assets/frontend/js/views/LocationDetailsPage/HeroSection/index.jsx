/* eslint-disable react/prop-types */
import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useStyles from './useStyles';
import InfoCard from './InfoCard';
import Header from './Header';
import HeroImage from './HeroImage';

function HeroSection({ location, locationName }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ContainerFullScreen>
        <div className={classes.grid}>
          <HeroImage src={location.image} isLg />

          <div>
            <Header locationName={locationName} location={location} />
            <HeroImage src={location.image} />
            <InfoCard location={location} />
          </div>
        </div>
      </ContainerFullScreen>
    </div>
  );
}

export default HeroSection;
