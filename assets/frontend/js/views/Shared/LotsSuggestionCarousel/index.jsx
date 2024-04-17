import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { SwiperSlide } from 'swiper/react';
import classnames from 'classnames';

import RouterService from 'frontend/js/api/RouterService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import VehicleVerticalCard from 'frontend/js/views/Shared/VehicleVerticalCard';
import { WatchlistProvider } from 'frontend/js/context/WatchlistContext';
import Swiper from 'frontend/js/components/Swiper';
import Arrow from './icons/Arrow';

import DetailsSection from './DetailsSection';
import useStyles from './useStyles';
import CtaSection from './CtaSection';

function Carousel({ lots, controlsElementId, analytics, hideBid }) {
  const classes = useStyles();

  function renderNavigationButton(classname) {
    const $el = document.getElementById(controlsElementId);
    if (!$el) {
      return null;
    }

    return ReactDOM.createPortal(
      <div className={classnames(classes.navigation, classname)}>
        <Arrow />
      </div>,
      $el,
    );
  }

  const params = {
    navigation: {
      prevEl: `.${classes.prev}`,
      nextEl: `.${classes.next}`,
      disabledClass: classes.navigationDisabled,
      lockClass: classes.navigationHidden,
    },
    pagination: {
      el: `.${classes.bullets}`,
      type: 'bullets',
      clickable: true,
      bulletClass: classes.bullet,
      bulletActiveClass: classes.activeBullet,
    },
    simulateTouch: false,
    watchOverflow: true,
    slidesPerView: 'auto',
    spaceBetween: 18,
    slidesPerGroup: 1,
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 18,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
      1780: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
      },
    },
  };

  return (
    <WatchlistProvider>
      <div className={classes.root}>
        <ContainerFullScreen className={classes.container}>
          <Swiper {...params} className={classes.swiper}>
            {lots.map((lot, index) => (
              <SwiperSlide key={index} className={classes.slide}>
                <VehicleVerticalCard
                  lot={lot}
                  key={lot.id}
                  details={<DetailsSection lot={lot} />}
                  className={classes.vehicleCard}
                  controls={
                    <CtaSection
                      analytics={analytics}
                      href={RouterService.getRoute('lot', null, false, { id: lot.id, slug: lot.slug })}
                      currentBid={lot.currentBid}
                      currency={lot.currency}
                      hideBid={hideBid}
                    />
                  }
                />
              </SwiperSlide>
            ))}
            {renderNavigationButton(classes.prev)}
            {renderNavigationButton(classes.next)}
          </Swiper>
        </ContainerFullScreen>
      </div>
    </WatchlistProvider>
  );
}

Carousel.propTypes = {
  lots: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  analytics: PropTypes.shape({}).isRequired,
  controlsElementId: PropTypes.string.isRequired,
  hideBid: PropTypes.bool,
};

Carousel.defaultProps = {
  hideBid: false,
};

export default Carousel;
