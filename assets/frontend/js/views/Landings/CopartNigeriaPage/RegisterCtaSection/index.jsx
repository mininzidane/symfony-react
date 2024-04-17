import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import Button from 'frontend/js/components/Button';
import BackgroundJpg from './img/us-ca-ng-flags.jpg';
import BackgroundMobilePng from './img/us-ca-ng-flags-mobile.jpg';
import useStyles from './useStyles';

function RegisterCtaSection() {
  const classes = useStyles();

  function handleClick() {
    ScrollService.smoothScrollIntoViewById('register-card-container');

    setTimeout(() => {
      document.getElementById('register-first-name').focus();
    }, 1000);
  }

  return (
    <div className={classes.root}>
      <ContainerFullScreen background={{ xl_x1: BackgroundJpg, sm_x1: BackgroundMobilePng }}>
        <div className={classes.grid}>
          <h2 className={classes.title}>Bid in All Copart Auctions Across the United States of America</h2>
          <Button onClick={handleClick} color="yellow" label="Register Now" className={classes.button} />
        </div>
      </ContainerFullScreen>
    </div>
  );
}

export default RegisterCtaSection;
