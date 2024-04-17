import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import CountryService from 'frontend/js/api/CountryService';
import Container from 'frontend/js/components/Container';
import Feature from './Feature';
import useStyles from './useStyles';
import Step1Svg from './img/step1.svg';
import Step2Svg from './img/step2.svg';
import Step3Svg from './img/step3.svg';

const staticKeys = {
  ka: {
    title: 'landings.brokerPage.ka.features.title',
    cards: [
      {
        title: 'landings.brokerPage.ka.features.feature1.title',
        desc: 'landings.brokerPage.ka.features.feature1.desc',
      },
      {
        title: 'landings.brokerPage.ka.features.feature2.title',
        desc: 'landings.brokerPage.ka.features.feature2.desc',
      },
      {
        title: 'landings.brokerPage.ka.features.feature3.title',
        desc: 'landings.brokerPage.ka.features.feature3.desc',
      },
    ],
  },
  ru: {
    title: 'landings.brokerPage.ru.features.title',
    cards: [
      {
        title: 'landings.brokerPage.ru.features.feature1.title',
        desc: 'landings.brokerPage.ru.features.feature1.desc',
      },
      {
        title: 'landings.brokerPage.ru.features.feature2.title',
        desc: 'landings.brokerPage.ru.features.feature2.desc',
      },
      {
        title: 'landings.brokerPage.ru.features.feature3.title',
        desc: 'landings.brokerPage.ru.features.feature3.desc',
      },
    ],
  },
};

function Features({ iso2 }) {
  const classes = useStyles();
  const isGE = CountryService.isCountry(iso2, 'georgia');
  const localeStaticKeys = isGE ? staticKeys.ka : staticKeys.ru;

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id={localeStaticKeys.title} />
        </h2>

        <div className={classes.grid}>
          <Feature
            icon={<img src={Step1Svg} width="133" alt="Шаг 1" />}
            title={<FormattedMessage id={localeStaticKeys.cards[0].title} />}
            desc={<FormattedMessage id={localeStaticKeys.cards[0].desc} />}
          />

          <Feature
            icon={<img src={Step2Svg} width="133" alt="Шаг 2" />}
            title={<FormattedMessage id={localeStaticKeys.cards[1].title} />}
            desc={<FormattedMessage id={localeStaticKeys.cards[1].desc} />}
          />

          <Feature
            icon={<img src={Step3Svg} width="133" alt="Шаг 3" />}
            title={<FormattedMessage id={localeStaticKeys.cards[2].title} />}
            desc={<FormattedMessage id={localeStaticKeys.cards[2].desc} />}
          />
        </div>
      </Container>
    </div>
  );
}

Features.propTypes = {
  iso2: PropTypes.string.isRequired,
};

export default Features;
