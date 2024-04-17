import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import Benefit from './Benefit';
import useStyles from './useStyles';

function Benefits() {
  const classes = useStyles();

  return (
    <ContainerFullScreen background={{ color: '#E6E6E6' }} className={classes.root}>
      <Container>
        <h1 className={classes.title}>
          <FormattedMessage id="domesticShippingPage.domesticAutoShipping" />
        </h1>
        <h3 className={classes.subtitle}>
          <FormattedMessage id="domesticShippingPage.shippingBenefitsWithAutoBidMaster" />
        </h3>
        <div className={classes.benefits}>
          <Benefit
            title={<FormattedMessage id="domesticShippingPage.benefit1.title" />}
            desc={<FormattedMessage id="domesticShippingPage.benefit1.desc" />}
          />
          <Benefit
            title={<FormattedMessage id="domesticShippingPage.benefit2.title" />}
            desc={
              <FormattedMessage
                id="domesticShippingPage.benefit2.desc"
                values={{
                  a: (chunks) => (
                    <Link href="https://www.easyhaul.com/" isTargetBlank isNofollow>
                      {chunks}
                    </Link>
                  ),
                }}
              />
            }
          />
          <Benefit
            title={<FormattedMessage id="domesticShippingPage.benefit3.title" />}
            desc={<FormattedMessage id="domesticShippingPage.benefit3.desc" />}
          />
          <Benefit
            title={<FormattedMessage id="domesticShippingPage.benefit4.title" />}
            desc={<FormattedMessage id="domesticShippingPage.benefit4.desc" />}
          />
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default Benefits;
