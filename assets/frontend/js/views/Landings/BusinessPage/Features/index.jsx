import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import CountryService from 'frontend/js/api/CountryService';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import Benefit from 'frontend/js/views/Shared/Benefit';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';

function Benefits() {
  const classes = useStyles();
  const { isUserCountry } = CountryService;
  const intl = useIntl();

  const isUA = isUserCountry('ukraine');
  const isBY = isUserCountry('belarus');
  const isRU = isUserCountry('russia');
  const isGE = isUserCountry('georgia');

  return (
    <div className={classes.root}>
      <Container>
        <h2 className={classes.title}>{intl.formatMessage({ id: 'businessPage.features.title' })}</h2>
        <div className={classes.featuresGrid}>
          <Benefit
            title={intl.formatMessage({ id: 'businessPage.features.0.title' })}
            subtitle={intl.formatMessage(
              { id: 'businessPage.features.0.subtitle' },
              {
                country:
                  (isUA && 'в Украину') || (isRU && 'в Россию') || (isBY && 'в Беларусь') || (isGE && 'в Грузию'),
              },
            )}
            type="copart"
          />
          <Benefit
            title={intl.formatMessage({ id: 'businessPage.features.1.title' })}
            subtitle={intl.formatMessage(
              { id: 'businessPage.features.1.subtitle' },
              {
                country: (isUA && 'Украины') || (isRU && 'России') || (isBY && 'Беларуси') || (isGE && 'Грузии'),
              },
            )}
            type="liveAuction"
          />
          <Benefit
            title={intl.formatMessage({ id: 'businessPage.features.2.title' })}
            subtitle={intl.formatMessage(
              { id: 'businessPage.features.2.subtitle' },
              {
                country:
                  (isUA && 'в Украину') || (isRU && 'в Россию') || (isBY && 'в Беларусь') || (isGE && 'в Грузию'),
              },
            )}
            type="services"
          />
          <Benefit
            title={intl.formatMessage({ id: 'businessPage.features.3.title' })}
            subtitle={intl.formatMessage({ id: 'businessPage.features.3.subtitle' })}
            type="credit"
          />
          <Benefit
            title={intl.formatMessage({ id: 'businessPage.features.4.title' })}
            subtitle={intl.formatMessage({ id: 'businessPage.features.4.subtitle' })}
            type="support"
          />
          <Benefit
            title={intl.formatMessage({ id: 'businessPage.features.5.title' })}
            subtitle={intl.formatMessage({ id: 'businessPage.features.5.subtitle' })}
            type="shipping"
          />
          <Benefit
            title={intl.formatMessage({ id: 'businessPage.features.6.title' })}
            subtitle={intl.formatMessage(
              { id: 'businessPage.features.6.subtitle' },
              {
                port:
                  (isUA && 'Одессы') ||
                  (isRU && 'Новороссийска и доставка в Россию') ||
                  (isBY && 'Клайпеды и доставка в Минск'),
              },
            )}
            type="insurance"
          />
          <Benefit
            title={intl.formatMessage({ id: 'businessPage.features.7.title' })}
            subtitle={intl.formatMessage(
              { id: 'businessPage.features.7.subtitle' },
              {
                link: (str) => <Link href={RouterService.getRoute('contactUs')}>{str}</Link>,
                port: (isUA && 'Одессы') || (isRU && 'Новороссийска') || (isBY && 'Клайпеды'),
                country: (isUA && 'в Одессе') || (isRU && 'в России') || (isBY && 'в Минске'),
              },
            )}
            type="oceanAgent"
          />
        </div>
      </Container>
    </div>
  );
}

export default Benefits;
