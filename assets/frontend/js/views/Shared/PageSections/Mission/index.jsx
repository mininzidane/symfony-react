import React from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Container from 'frontend/js/components/Container';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';
import BackgroundJpg from './img/background.jpg';
import Background2xJpg from './img/background@2x.jpg';
import BackgroundMobileJpg from './img/background-mobile.jpg';
import BackgroundMobile2xJpg from './img/background-mobile@2x.jpg';

function Mission() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();
  const intl = useIntl();

  let bgImage;
  if (ViewportService.isHighDPI) {
    bgImage = isBelowSm ? BackgroundMobile2xJpg : Background2xJpg;
  } else {
    bgImage = isBelowSm ? BackgroundMobileJpg : BackgroundJpg;
  }

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${bgImage})` }}>
      <Container>
        <div className={classes.wrap}>
          <div className={classes.title}>{intl.formatMessage({ id: 'businessPage.mission.title' })}</div>
          <div className={classes.subtitle}>{intl.formatMessage({ id: 'businessPage.mission.subtitle' })}</div>
        </div>
      </Container>
    </div>
  );
}

export default Mission;
