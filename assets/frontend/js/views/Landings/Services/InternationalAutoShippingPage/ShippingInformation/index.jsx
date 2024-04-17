import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import Contact from './Contact';
import useStyles from './useStyles';

function ShippingInformation() {
  const classes = useStyles();

  return (
    <ContainerFullScreen background={{ color: '#D2E6F5' }} className={classes.root}>
      <Container>
        <div className={classes.wrap}>
          <h2 className={classes.title}>
            <FormattedMessage
              id="internationalAutoShippingPage.shippingInformation.title"
              values={{ br: <br className="sm-hide" /> }}
            />
          </h2>
          <p className={classes.desc}>
            <FormattedMessage
              id="internationalAutoShippingPage.shippingInformation.desc"
              values={{
                a: (chunks) => (
                  <Link href="https://www.easyhaul.com/" isTargetBlank isNofollow>
                    {chunks}
                  </Link>
                ),
              }}
            />
          </p>
          <Contact className={classes.contact} />
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default ShippingInformation;
