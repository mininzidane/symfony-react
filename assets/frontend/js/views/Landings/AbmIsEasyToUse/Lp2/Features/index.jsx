import React from 'react';
import Container from 'frontend/js/components/Container';
import StringService from 'frontend/js/lib/utils/StringService';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';
import Feature from './Feature';
import PcMockupJpg from './img/pc-mockup.jpg';
import SignUpCta from '../Shared/SignUpCta';

function Features() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${PcMockupJpg})` }}>
      <Container>
        <div className={classes.innerWrap}>
          <Feature
            title={StringService.capitalizeEachWord(
              intl.formatMessage({ id: 'stateLandingPage.aboutUs.industry_leading_expertise' }),
            )}
            text={intl.formatMessage({
              id: 'stateLandingPage.aboutUs.auto_bid_master_has_been_in_the_online_auto_auction',
            })}
          />
          <Feature
            title={StringService.capitalizeEachWord(
              intl.formatMessage({ id: 'stateLandingPage.aboutUs.proprietary_bidding_platform' }),
            )}
            text={intl.formatMessage({
              id: 'stateLandingPage.aboutUs.we_provide_all_the_tools_you_need_to_save_thousands',
            })}
          />
          <Feature
            title={StringService.capitalizeEachWord(
              intl.formatMessage({ id: 'stateLandingPage.aboutUs.friendly_customer_service' }),
            )}
            text={intl.formatMessage({
              id: 'stateLandingPage.aboutUs.our_agents_average_over_four_years_of_experience',
            })}
          />
        </div>

        <div className={classes.buttonWrap}>
          <SignUpCta />
        </div>
      </Container>
    </div>
  );
}

export default Features;
