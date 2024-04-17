import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Container from '../../../components/Container';
import Step1Icon from './img/step-1.svg';
import Step2Icon from './img/step-2.svg';
import Step3Icon from './img/step-3.svg';
import Image from '../../../components/Image';

function Guide({ img }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.title}>
          <FormattedMessage id="stateLandingPage.guide.its_easy_to_save_thousands" />
        </div>
        <div className={classes.content}>
          <div className={classes.steps}>
            <div className={classes.step}>
              <img className={classes.stepIcon} src={Step1Icon} alt="Sign up Icon" />
              <div>
                <div className={classes.stepLabel}>
                  1. <FormattedMessage id="stateLandingPage.guide.sign_up_now" />
                </div>
                <div className={classes.stepValue}>
                  <FormattedMessage id="stateLandingPage.guide.its_fast_easy_and_secure" />
                </div>
              </div>
            </div>
            <div className={classes.step}>
              <img className={classes.stepIcon} src={Step2Icon} alt="Bidding Icon" />
              <div>
                <div className={classes.stepLabel}>
                  2. <FormattedMessage id="stateLandingPage.guide.start_bidding" />
                </div>
                <div className={classes.stepValue}>
                  <FormattedMessage id="stateLandingPage.guide.search_and_bid_on_vehicles" />
                </div>
              </div>
            </div>
            <div className={classes.step}>
              <img className={classes.stepIcon} src={Step3Icon} alt="Purchase Icon" />
              <div>
                <div className={classes.stepLabel}>
                  3. <FormattedMessage id="stateLandingPage.guide.complete_your_purchase" />
                </div>
                <div className={classes.stepValue}>
                  <FormattedMessage id="stateLandingPage.guide.finalize_documentation_and_payment" />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.img}>
            <Image ratio={37.5} src={img} alt="Vehicles" />
          </div>
        </div>
      </Container>
    </div>
  );
}

Guide.propTypes = {
  img: PropTypes.node.isRequired,
};

export default Guide;
