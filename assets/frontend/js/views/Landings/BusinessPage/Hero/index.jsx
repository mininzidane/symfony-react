import React from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Container from 'frontend/js/components/Container';
import LeadService from 'frontend/js/api/LeadService';
import CountryService from 'frontend/js/api/CountryService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import HeroBackgroundJpg from 'frontend/images/shared/landings/hero/hero-background.jpg';
import HeroBackgroundMobileJpg from 'frontend/images/shared/landings/hero/hero-background-mobile.jpg';
import LeadCard from 'frontend/js/views/Shared/LeadCard';
import useStyles from './useStyles';

function Hero() {
  const classes = useStyles();
  const intl = useIntl();
  const { isUserCountry } = CountryService;
  const { isBelowSm, isAboveMd, isBelowMd } = useBreakpoint();
  const leadSource = LeadService.SOURCE_BUSINESS;
  const isUA = isUserCountry('ukraine');
  const isBY = isUserCountry('belarus');
  const isRU = isUserCountry('russia');
  const isRussian = isBY || isUA || isRU;
  const ga = new GoogleAnalyticsService();

  function handleFormSuccess() {
    ga.sendEvent('submit', 'sendform', 'business');
  }

  return (
    <div
      className={classes.root}
      style={{ backgroundImage: `url(${isBelowSm ? HeroBackgroundMobileJpg : HeroBackgroundJpg})` }}
    >
      <Container>
        <div className={classes.grid}>
          <div className={classes.description}>
            <h1 className={classes.title}>
              {intl.formatMessage(
                { id: 'businessPage.title' },
                {
                  country: (isUA && 'Украине') || (isBY && 'Беларуси') || (isRU && 'России'),
                  br: () => (isRussian ? <br /> : ''),
                  nobr: (str) => <nobr>{str}</nobr>,
                },
              )}
            </h1>
            <div className={classes.subtitle}>
              <FormattedMessage
                id="businessPage.subtitle"
                values={{
                  country: (isUA && 'Украину') || (isBY && 'Беларусь') || (isRU && 'Россию'),
                  countryAt: (isUA && 'Украине') || (isBY && 'Беларуси') || (isRU && 'России'),
                }}
              />
            </div>
          </div>

          {isAboveMd && (
            <div>
              <LeadCard leadSource={leadSource} onFormSuccess={handleFormSuccess} />
            </div>
          )}
        </div>
      </Container>

      {isBelowMd && (
        <div style={{ backgroundColor: '#FFFFFF' }}>
          <Container>
            <LeadCard leadSource={leadSource} onFormSuccess={handleFormSuccess} />
          </Container>
        </div>
      )}
    </div>
  );
}

export default Hero;
