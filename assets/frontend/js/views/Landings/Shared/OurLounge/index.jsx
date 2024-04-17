/* eslint-disable react/prop-types */
import React from 'react';
import VehicleImageCarousel from 'frontend/js/views/Shared/VehicleImageCarousel';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import BackgroundPng from './img/background.png';
import data from './data';
import useStyles from './useStyles';

function OurLounge({ iso2 }) {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  const photos = data[iso2];

  if (!photos) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="loungePage.ourLounge.title" />
        </h2>

        <div className={classes.wrap}>
          {isAboveSm && <img src={BackgroundPng} className={classes.background} alt="background" />}

          <VehicleImageCarousel
            images={photos.map((img) => img)}
            title=""
            classes={{ position: classes.position, next: classes.next, prev: classes.prev, slides: classes.carousel }}
          />
        </div>
      </div>
    </div>
  );
}

export default OurLounge;
