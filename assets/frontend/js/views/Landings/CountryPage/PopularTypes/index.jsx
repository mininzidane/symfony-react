import React from 'react';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Type from './Type';
import useStyles from './useStyles';

function PopularTypes() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="countryLandingPage.popularTypes.title" />
        </h2>

        <div className={classes.grid}>
          <Type
            type="pureSale"
            title={<FormattedMessage id="countryLandingPage.pureSale.title" />}
            subtitle={<FormattedMessage id="countryLandingPage.pureSale.subtitle" />}
          />
          <Type
            type="buyNow"
            title={<FormattedMessage id="countryLandingPage.buyNow.title" />}
            subtitle={<FormattedMessage id="countryLandingPage.buyNow.subtitle" />}
          />
          <Type
            type="minimumBid"
            title={<FormattedMessage id="countryLandingPage.minimumBid.title" />}
            subtitle={<FormattedMessage id="countryLandingPage.minimumBid.subtitle" />}
          />
          <Type
            type="onApproval"
            title={<FormattedMessage id="countryLandingPage.onApproval.title" />}
            subtitle={<FormattedMessage id="countryLandingPage.onApproval.subtitle" />}
          />
        </div>
      </Container>
    </div>
  );
}

export default PopularTypes;
