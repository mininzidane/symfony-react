import React from 'react';
import Container from 'frontend/js/components/Container';
import CountryService from 'frontend/js/api/CountryService';
import useIntl from 'frontend/js/hooks/useIntl';
import Advantage from './Advantage';
import useStyles from './useStyles';
import BrokerSVG from './img/broker.svg';
import GeardSVG from './img/geard.svg';
import SupportSVG from './img/ic-support.svg';
import RuSupportSVG from './img/ru-support.svg';
import USASVG from './img/USA.svg';
import WebsiteSVG from './img/website.svg';

function Advantages() {
  const classes = useStyles();
  const { isUserCountry } = CountryService;
  const intl = useIntl();

  const isUA = isUserCountry('ukraine');
  const isBY = isUserCountry('belarus');
  const isRU = isUserCountry('russia');
  const isRussian = isBY || isUA || isRU;

  return (
    <div className={classes.root}>
      <Container>
        <h2 className={classes.title}>{intl.formatMessage({ id: 'businessPage.advantages.title' })}</h2>
        <div className={classes.advantages}>
          <Advantage
            icon={USASVG}
            title={intl.formatMessage({ id: 'businessPage.advantages.0.title' })}
            desc={intl.formatMessage({ id: 'businessPage.advantages.0.subtitle' })}
          />
          <Advantage
            icon={BrokerSVG}
            title={intl.formatMessage({ id: 'businessPage.advantages.1.title' })}
            desc={intl.formatMessage({ id: 'businessPage.advantages.1.subtitle' })}
          />
          <Advantage
            className="isWebsite"
            icon={WebsiteSVG}
            title={intl.formatMessage({ id: 'businessPage.advantages.2.title' })}
            desc={intl.formatMessage({ id: 'businessPage.advantages.2.subtitle' })}
          />
          <Advantage
            className="isRuSupport"
            icon={isRussian ? RuSupportSVG : SupportSVG}
            title={intl.formatMessage({ id: 'businessPage.advantages.3.title' })}
            desc={intl.formatMessage(
              { id: 'businessPage.advantages.3.subtitle' },
              {
                country: (isUA && 'Украине') || (isRU && 'России') || (isBY && 'Беларуси'),
              },
            )}
          />
          <Advantage
            icon={GeardSVG}
            title={intl.formatMessage({ id: 'businessPage.advantages.4.title' })}
            desc={intl.formatMessage({ id: 'businessPage.advantages.4.subtitle' })}
          />
        </div>
      </Container>
    </div>
  );
}

export default Advantages;
