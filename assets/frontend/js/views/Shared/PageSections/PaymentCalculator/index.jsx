import React from 'react';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import ShippingCalculator from 'frontend/js/views/Shared/ShippingCalculator';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import BgJpg from './img/bg.jpg';
import Bg2xJpg from './img/bg@2x.jpg';
import BgMobileJpg from './img/bg_mobile.jpg';
import useStyles from './useStyles';

function PaymentCalculator() {
  const classes = useStyles();

  return (
    <div>
      <ContainerFullScreen
        className={classes.root}
        background={{
          xl_x1: BgJpg,
          xl_x2: Bg2xJpg,
          sm_x1: BgMobileJpg,
          sm_x2: BgMobileJpg,
          color: '#FDFDFF',
        }}
      >
        <Container>
          <SectionTitle text={<FormattedMessage id="homePage.intl.paymentCalculator.title" />} />
          <p className={classes.subtitle}>
            <FormattedMessage id="homePage.intl.paymentCalculator.subtitle" />
          </p>

          <ShippingCalculator
            defaultValues={{
              lotIdOrVin: ShippingCalculator.DEFAULT_LOT_ID,
              source: 'homepage',
              auction: null,
            }}
          />
        </Container>

        <div className={classes.gradient} />
      </ContainerFullScreen>
    </div>
  );
}

export default PaymentCalculator;
