import React from 'react';
import Container from 'frontend/js/components/Container';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import StringService from 'frontend/js/lib/utils/StringService';
import useStyles from './useStyles';

function Features() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.grid}>
          <div className={classes.feature}>
            <div className={classes.title}>
              {StringService.capitalizeEachWord(
                intl.formatMessage({ id: 'stateLandingPage.aboutUs.industry_leading_expertise' }),
              )}
            </div>
            <div className={classes.text}>
              <FormattedMessage id="stateLandingPage.aboutUs.auto_bid_master_has_been_in_the_online_auto_auction" />
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.title}>
              {StringService.capitalizeEachWord(
                intl.formatMessage({ id: 'stateLandingPage.aboutUs.proprietary_bidding_platform' }),
              )}
            </div>
            <div className={classes.text}>
              <FormattedMessage id="stateLandingPage.aboutUs.we_provide_all_the_tools_you_need_to_save_thousands" />
            </div>
          </div>

          <div className={classes.feature}>
            <div className={classes.title}>
              {StringService.capitalizeEachWord(
                intl.formatMessage({ id: 'stateLandingPage.aboutUs.friendly_customer_service' }),
              )}
            </div>
            <div className={classes.text}>
              <FormattedMessage id="stateLandingPage.aboutUs.our_agents_average_over_four_years_of_experience" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Features;
