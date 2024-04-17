import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import CountryService from 'frontend/js/api/CountryService';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import CardsGrid from './CardsGrid';
import CardsCarousel from './CardsCarousel';
import useStyles from './useStyles';

const staticKeys = {
  ka: {
    title: `landings.brokerPage.ka.vehiclesSold.title`,
    moreLink: `landings.brokerPage.ka.vehiclesSold.moreLink`,
  },
  ru: {
    title: `landings.brokerPage.ru.vehiclesSold.title`,
    moreLink: `landings.brokerPage.ru.vehiclesSold.moreLink`,
  },
};

function VehiclesSold({ iso2 }) {
  const classes = useStyles();
  const isGE = CountryService.isCountry(iso2, 'georgia');
  const localeStaticKeys = isGE ? staticKeys.ka : staticKeys.ru;
  const { isAboveSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div>
          <h2 className={classes.title}>
            <FormattedMessage id={localeStaticKeys.title} />
          </h2>

          {isAboveSm ? <CardsGrid /> : <CardsCarousel />}
        </div>

        <div className={classes.moreLinkWrap}>
          <Link routeParams={['searchResults', { VehicleType: 'V' }]}>
            <FormattedMessage id={localeStaticKeys.moreLink} />
          </Link>
        </div>
      </Container>
    </div>
  );
}

VehiclesSold.propTypes = {
  iso2: PropTypes.string.isRequired,
};

export default VehiclesSold;
