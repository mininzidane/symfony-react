import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CountryService from 'frontend/js/api/CountryService';
import Feature from './Feature';
import BidSvg from './img/ic_bid.svg';
import SaveSvg from './img/ic_save.svg';
import HelpSvg from './img/ic_help.svg';
import BrokerSvg from './img/ic_broker.svg';
import useStyles from './useStyles';

const staticKeys = {
  ka: [
    {
      text: `landings.brokerPage.ka.hero.features.feature1.title`,
      alt: `landings.brokerPage.ka.hero.features.feature1.alt`,
    },
    {
      text: `landings.brokerPage.ka.hero.features.feature2.title`,
      alt: `landings.brokerPage.ka.hero.features.feature2.alt`,
    },
    {
      text: `landings.brokerPage.ka.hero.features.feature3.title`,
      alt: `landings.brokerPage.ka.hero.features.feature3.alt`,
    },
    {
      text: `landings.brokerPage.ka.hero.features.feature4.title`,
      alt: `landings.brokerPage.ka.hero.features.feature4.alt`,
    },
  ],
  ru: [
    {
      text: `landings.brokerPage.ru.hero.features.feature1.title`,
      alt: `landings.brokerPage.ru.hero.features.feature1.alt`,
    },
    {
      text: `landings.brokerPage.ru.hero.features.feature2.title`,
      alt: `landings.brokerPage.ru.hero.features.feature2.alt`,
    },
    {
      text: `landings.brokerPage.ru.hero.features.feature3.title`,
      alt: `landings.brokerPage.ru.hero.features.feature3.alt`,
    },
    {
      text: `landings.brokerPage.ru.hero.features.feature4.title`,
      alt: `landings.brokerPage.ru.hero.features.feature4.alt`,
    },
  ],
};

function Features({ iso2 }) {
  const classes = useStyles();
  const { COUNTRIES } = CountryService;

  const countryName = {
    [iso2 === COUNTRIES.ukraine.iso2]: 'Украине',
    [iso2 === COUNTRIES.belarus.iso2]: 'Беларуси',
  }.true;

  const isGE = CountryService.isCountry(iso2, 'georgia');
  const localeStaticKeys = isGE ? staticKeys.ka : staticKeys.ru;

  return (
    <div className={classes.root}>
      <Feature
        icon={BidSvg}
        text={<FormattedMessage id={localeStaticKeys[0].text} />}
        alt={<FormattedMessage id={localeStaticKeys[0].alt} />}
      />

      <Feature
        icon={SaveSvg}
        text={<FormattedMessage id={localeStaticKeys[1].text} />}
        alt={<FormattedMessage id={localeStaticKeys[1].alt} />}
      />

      <Feature
        icon={HelpSvg}
        text={<FormattedMessage id={localeStaticKeys[2].text} />}
        alt={<FormattedMessage id={localeStaticKeys[2].alt} />}
      />

      <Feature
        icon={BrokerSvg}
        text={<FormattedMessage id={localeStaticKeys[3].text} values={{ countryName }} />}
        alt={<FormattedMessage id={localeStaticKeys[3].alt} />}
      />
    </div>
  );
}

Features.propTypes = {
  iso2: PropTypes.string.isRequired,
};

export default Features;
