import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';
import Container from '../../../components/Container';
import Image from '../../../components/Image';
import PhotoPng from './img/photo.png';

function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.mobileImg}>
        <Image ratio={103} src={PhotoPng} alt="Photo" />
      </div>
      <Container className={classes.container}>
        <div className={classes.articles}>
          <div className={classes.article}>
            <div className={classes.title}>
              <FormattedMessage id="stateLandingPage.aboutUs.industry_leading_expertise" />
            </div>
            <FormattedMessage id="stateLandingPage.aboutUs.auto_bid_master_has_been_in_the_online_auto_auction" />
          </div>
          <div className={classes.article}>
            <div className={classes.title}>
              <FormattedMessage id="stateLandingPage.aboutUs.proprietary_bidding_platform" />
            </div>
            <FormattedMessage id="stateLandingPage.aboutUs.we_provide_all_the_tools_you_need_to_save_thousands" />
          </div>
          <div className={classes.article}>
            <div className={classes.title}>
              <FormattedMessage id="stateLandingPage.aboutUs.friendly_customer_service" />
            </div>
            <FormattedMessage id="stateLandingPage.aboutUs.our_agents_average_over_four_years_of_experience" />
          </div>
        </div>
        <div className={classes.img}>
          <Image ratio={103} src={PhotoPng} alt="Photo" />
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;
