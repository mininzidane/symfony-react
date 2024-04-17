import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import Step from './Step';
import BookmarkSvg from './img/bookmark.svg';
import CountdownSvg from './img/countdown.svg';
import KeyboardSvg from './img/keyboard.svg';
import useStyles from './useStyles';

function ShippingBenefits() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <ContainerFullScreen background={{ color: '#EEF3F5' }} className={classes.root}>
      <Container>
        <div className={classes.wrap}>
          <h2 className={classes.title}>{intl.formatMessage({ id: 'domesticShippingPage.delivery.title' })}</h2>

          <div className={classes.steps}>
            <Step
              icon={BookmarkSvg}
              title={intl.formatMessage({ id: 'domesticShippingPage.delivery.step1.title' })}
              desc={intl.formatMessage({ id: 'domesticShippingPage.delivery.step1.desc' })}
            />
            <Step
              icon={KeyboardSvg}
              title={intl.formatMessage({ id: 'domesticShippingPage.delivery.step2.title' })}
              desc={intl.formatMessage({ id: 'domesticShippingPage.delivery.step2.desc' })}
            />
            <Step
              icon={CountdownSvg}
              title={intl.formatMessage({ id: 'domesticShippingPage.delivery.step3.title' })}
              desc={intl.formatMessage({ id: 'domesticShippingPage.delivery.step3.desc' })}
            />
          </div>

          <p className={classes.disclaimer}>{intl.formatMessage({ id: 'domesticShippingPage.delivery.disclaimer' })}</p>
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default ShippingBenefits;
