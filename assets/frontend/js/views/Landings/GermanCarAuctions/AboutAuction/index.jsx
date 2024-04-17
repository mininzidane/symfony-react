import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Container from 'frontend/js/components/Container';
import useStyles from './useStyles';

function AboutAuction() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <h2 className={classes.title}>
          <FormattedMessage id="germanCarAuctionsPage.aboutAuction.title" />
        </h2>
        <div className={classes.grid}>
          <FormattedMessage id="germanCarAuctionsPage.aboutAuction.p1" />
          <br />
          <br />
          <FormattedMessage id="germanCarAuctionsPage.aboutAuction.p2" />
          <br />
          <br />
          <FormattedMessage id="germanCarAuctionsPage.aboutAuction.p3" />
          <br />
          <br />
          <FormattedMessage id="germanCarAuctionsPage.aboutAuction.p4" />
          <br />
          <br />
          <FormattedMessage id="germanCarAuctionsPage.aboutAuction.p5" />
          <br />
          <br />
          <FormattedMessage id="germanCarAuctionsPage.aboutAuction.p6" />
          <br />
          <br />
          <FormattedMessage id="germanCarAuctionsPage.aboutAuction.p7" />
        </div>
      </Container>
    </div>
  );
}

export default AboutAuction;
