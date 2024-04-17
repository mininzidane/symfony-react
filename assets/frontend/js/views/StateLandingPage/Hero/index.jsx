import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Container from '../../../components/Container';
import Form from '../Form';

function Hero({ titleKey, img, statesImg, state }) {
  const classes = useStyles({ state });

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${img})` }}>
      <Container className={classes.container}>
        <img className={classes.statesImg} src={statesImg} alt="States Icon" />
        <Form className={classes.form} />
        <div className={classes.text}>
          <div className={classes.title}>
            <FormattedMessage id={titleKey} />
          </div>
          <ul>
            <li>
              <FormattedMessage id="stateLandingPage.advantages.over_100000_vehicles_at_Auction" />
            </li>
            <li>
              <FormattedMessage id="stateLandingPage.advantages.certified_copart_broker" />
            </li>
            <li>
              <FormattedMessage id="stateLandingPage.advantages.no_dealer_license_needed" />
            </li>
            <li>
              <FormattedMessage id="stateLandingPage.advantages.no_dealer_limitations" />
            </li>
            <li>
              <FormattedMessage id="stateLandingPage.advantages.superior_support_by_phone_and_email" />
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

Hero.propTypes = {
  titleKey: PropTypes.string.isRequired,
  img: PropTypes.node.isRequired,
  statesImg: PropTypes.node.isRequired,
  state: PropTypes.string.isRequired,
};

export default Hero;
