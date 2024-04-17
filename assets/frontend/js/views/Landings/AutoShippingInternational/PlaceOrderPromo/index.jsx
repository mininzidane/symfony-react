import React from 'react';
import Container from 'frontend/js/components/Container';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';
import BgJpg from './img/background.jpg';
import BgMobileJpg from './img/background-mobile.jpg';

function PlaceOrderPromo() {
  const classes = useStyles();

  function handleClick() {
    ScrollService.smoothScrollIntoViewById('shipping-calculator-container');
  }

  return (
    <ContainerFullScreen
      className={classes.root}
      background={{
        xl_x1: BgJpg,
        sm_x1: BgMobileJpg,
        color: '#00445D',
      }}
    >
      <Container>
        <div className={classes.title}>
          <FormattedMessage id="homePage.intl.callback.title" />
        </div>
        <Button
          onClick={handleClick}
          label={<FormattedMessage id="autoShippingInternationalPage.placeShippingOrder" />}
          color="yellow"
          isInline
        />
      </Container>
    </ContainerFullScreen>
  );
}

export default PlaceOrderPromo;
