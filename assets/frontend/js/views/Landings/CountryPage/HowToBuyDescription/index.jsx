import React from 'react';
import PropTypes from 'prop-types';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function HowToBuyDescription({ country }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div>
          <div className={classes.title}>
            <FormattedMessage id="countryLandingPage.howToBuyDescription.globalLogisticsSolutions" />
          </div>
          <div className={classes.text}>
            <FormattedMessage id="countryLandingPage.howToBuyDescription.globalLogisticsText" values={{ country }} />
          </div>
        </div>

        <div className={classes.grid}>
          <div>
            <div className={classes.title}>
              <FormattedMessage id="countryLandingPage.howToBuyDescription.roRoRequirements" />
            </div>
            <ul className={classes.list}>
              <FormattedMessage id="countryLandingPage.howToBuyDescription.roRoRequirementsList" />
            </ul>
          </div>

          <div>
            <div className={classes.title}>
              <FormattedMessage id="countryLandingPage.howToBuyDescription.containerShippingOptions" />
            </div>
            <ul className={classes.list}>
              <FormattedMessage id="countryLandingPage.howToBuyDescription.containerShippingList" />
            </ul>
          </div>

          <div>
            <div className={classes.title}>
              <FormattedMessage id="countryLandingPage.howToBuyDescription.documentsRequired" values={{ country }} />
            </div>
            <ul className={classes.list}>
              <FormattedMessage id="countryLandingPage.howToBuyDescription.documentsRequiredList" />
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

HowToBuyDescription.propTypes = {
  country: PropTypes.string.isRequired,
};

export default HowToBuyDescription;
