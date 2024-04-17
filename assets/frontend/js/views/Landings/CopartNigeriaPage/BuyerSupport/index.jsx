import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import BuyerSupportBgSvg from './img/buyer-support-bg.jpg';
import SupportManJpg from './img/support-man.jpg';
import useStyles from './useStyles';

function BuyerSupport() {
  const classes = useStyles();
  const { isBelowMd } = useBreakpoint();

  const Content = () => (
    <Container>
      <div className={classes.section}>
        <h2 className={classes.title}>Buyer Support</h2>
        <p className={classes.text}>
          Our agents average over 10+ years of experience with the auto auction buying process, and each one is uniquely
          qualified to give the best overall buying experience. They can help with any aspect of AutoBidMaster services
          and features. We even stay in touch even after you’ve won your auction! We want to ensure that you have
          received your vehicle and everything has gone as planned. If not, then we want to know about it!
        </p>
      </div>
    </Container>
  );

  return (
    <div className={classes.root}>
      {isBelowMd ? (
        <>
          <Content />
          <img className={classes.supportManImage} src={SupportManJpg} alt="Support" />
        </>
      ) : (
        <ContainerFullScreen
          background={{ xl_x1: BuyerSupportBgSvg, sm_x1: BuyerSupportBgSvg }}
          className={classes.container}
        >
          <Content />
        </ContainerFullScreen>
      )}
    </div>
  );
}

export default BuyerSupport;
