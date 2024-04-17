import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import Container from 'frontend/js/components/Container';
import OfficeLocationShape from 'frontend/js/lib/propshapes/OfficeLocationShape';
import ContactCard from './ContactCard';
import useStyles from './useStyles';

const Map = React.lazy(() => import('./Map'));

function Hero({ location, onCountryChange }) {
  const { isAboveSm } = useBreakpoint();
  const classes = useStyles();
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'contactUsPage.heroTitle' });

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.main}>
          <h1 className={classes.title}>{title}</h1>
          <div className={classes.desc}>
            <FormattedMessage id="contactUsPage.subtitle" />
          </div>

          <ContactCard className={classes.card} data={location} />
        </div>

        {isAboveSm && (
          <Suspense fallback={null}>
            <Map onCountryChange={onCountryChange} country={get(location, 'country.iso_2')} />
          </Suspense>
        )}

        <div className={classes.gradientOverlay} />
      </Container>
    </div>
  );
}

Hero.propTypes = {
  location: OfficeLocationShape,
  onCountryChange: PropTypes.func.isRequired,
};

Hero.defaultProps = {
  location: null,
};

export default Hero;
