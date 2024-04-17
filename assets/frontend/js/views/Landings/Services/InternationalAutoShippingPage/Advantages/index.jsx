import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function Advantages() {
  const classes = useStyles();

  return (
    <ContainerFullScreen background={{ color: '#D2E6F5' }} className={classes.root}>
      <Container className={classes.container}>
        <h1 className={classes.title}>
          <FormattedMessage id="internationalAutoShippingPage.advantages.title" />
        </h1>
        <div className={classes.advantage}>
          <FormattedMessage
            id="internationalAutoShippingPage.advantages.shipping"
            values={{ h2: (chunks) => <h2>{chunks}</h2> }}
          />
        </div>
        <div className={classes.advantage}>
          <FormattedMessage
            id="internationalAutoShippingPage.advantages.logistics"
            values={{
              h2: (chunks) => <h2>{chunks}</h2>,
              a: (chunks) => (
                <Link href="https://www.easyhaul.com/" isTargetBlank isNofollow>
                  {chunks}
                </Link>
              ),
            }}
          />
        </div>
        <div className={classes.advantage}>
          <FormattedMessage
            id="internationalAutoShippingPage.advantages.insurance"
            values={{ h2: (chunks) => <h2>{chunks}</h2> }}
          />
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default Advantages;
