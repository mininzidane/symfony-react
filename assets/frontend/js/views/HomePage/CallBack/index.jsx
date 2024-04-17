import React from 'react';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import Form from './Form';
import useStyles from './useStyles';
import BgJpg from './img/background.jpg';
import BgMobileJpg from './img/background-mobile.jpg';

function CallBack() {
  const classes = useStyles();

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
        <SectionTitle text={<FormattedMessage id="homePage.intl.callback.title" />} />
        <p className={classes.subtitle}>
          <FormattedMessage id="homePage.intl.callback.subtitle" />
        </p>
        <div className={classes.content}>
          <Form />
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default CallBack;
