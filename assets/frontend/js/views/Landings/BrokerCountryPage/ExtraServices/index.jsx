import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import CountryService from 'frontend/js/api/CountryService';
import AbmLogoSvg from 'frontend/images/shared/logo/abm-logo-blue.svg';
import Container from 'frontend/js/components/Container';
import CvLogoGraySvg from 'frontend/images/shared/logo/cv-logo-gray.svg';
import Card from './Card';
import useStyles from './useStyles';

const staticKeys = {
  ka: {
    title: 'landings.brokerPage.ka.extraServices.title',
    cards: [
      {
        title: 'landings.brokerPage.ka.extraServices.card1.title',
        desc: 'landings.brokerPage.ka.extraServices.card1.desc',
      },
      {
        title: 'landings.brokerPage.ka.extraServices.card2.title',
        desc: 'landings.brokerPage.ka.extraServices.card2.desc',
      },
    ],
  },
  ru: {
    title: 'landings.brokerPage.ka.extraServices.title',
    cards: [
      {
        title: 'landings.brokerPage.ru.extraServices.card1.title',
        desc: 'landings.brokerPage.ru.extraServices.card1.desc',
      },
      {
        title: 'landings.brokerPage.ru.extraServices.card2.title',
        desc: 'landings.brokerPage.ru.extraServices.card2.desc',
      },
    ],
  },
};

function ExtraServices({ iso2 }) {
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
          <Card
            icon={<img src={AbmLogoSvg} width="190" alt="AutoBidMaster" />}
            title={<FormattedMessage id={localeStaticKeys.cards[0].title} />}
            desc={<FormattedMessage id={localeStaticKeys.cards[0].desc} />}
          />
          <Card
            icon={<img src={CvLogoGraySvg} width="184" alt="ClearVIN" />}
            title={<FormattedMessage id={localeStaticKeys.cards[1].title} />}
            desc={<FormattedMessage id={localeStaticKeys.cards[1].desc} />}
          />
        </div>
      </Container>
    </div>
  );
}

ExtraServices.propTypes = {
  iso2: PropTypes.string.isRequired,
};

export default ExtraServices;
