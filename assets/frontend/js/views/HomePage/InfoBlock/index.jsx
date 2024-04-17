import React, { Fragment } from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import InfoCardsArray from './InfoCardsArray';
import CardsCarousel from './CarouselCards';
import useStyles from './useStyles';

function InfoBlock() {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  return (
    <ContainerFullScreen className={classes.root}>
      {isAboveSm ? (
        <div className={classes.cards}>
          {InfoCardsArray.map((card, index) => (
            <Fragment key={index}>{card}</Fragment>
          ))}
        </div>
      ) : (
        <CardsCarousel />
      )}
    </ContainerFullScreen>
  );
}

export default InfoBlock;
