import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import classnames from 'classnames';
import CatalogService from 'frontend/js/api/CatalogService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import CardsGrid from './CardsGrid';
import CardsInline from './CardsInline';
import CardsCarousel from './CardsCarousel';
import useStyles from './useStyles';

function PopularVehicles({ title, isIntlPage, maxLots, isInline }) {
  const classes = useStyles();
  const { data, isLoading } = useQuery('best-deals-data', () => CatalogService.getBestDeals());
  const { isBelowMd } = useBreakpoint();

  const lots = get(data, 'lots', []).slice(0, maxLots);

  if (data && lots.length < maxLots) {
    return null;
  }

  function getVehicles() {
    return lots.map((lot) => {
      const { year, make, model, location, link, currency, highBid, saleStartAt } = lot;
      const description = `${year} ${make} ${model}`;
      const locationName = location ? `${location.city}, ${location.stateCode}` : '';

      return {
        imageSrc: lot.largeImage,
        title: description,
        location: locationName,
        href: link,
        highBid,
        currencyCode: currency,
        saleStartAt,
      };
    });
  }

  const vehicles = getVehicles();

  return (
    <div
      className={classnames(classes.root, {
        'is-loading': isLoading && !isInline,
        'is-loading-inline': isLoading && isInline,
      })}
    >
      <ContainerFullScreen className={classes.container}>
        <SectionTitle
          text={
            title || (
              <>
                {isIntlPage ? (
                  <FormattedMessage
                    id="homePage.intl.popularVehicles.title"
                    values={{ countryName: BootstrapService.getAppValue('countryName') }}
                  />
                ) : (
                  <FormattedMessage id="homePage.popularVehicles.title" />
                )}
              </>
            )
          }
        />

        {!isLoading && (
          <>
            {isBelowMd ? (
              <CardsCarousel vehicles={vehicles} />
            ) : (
              <>{isInline ? <CardsInline vehicles={vehicles} /> : <CardsGrid vehicles={vehicles} />}</>
            )}
          </>
        )}
      </ContainerFullScreen>
    </div>
  );
}

PopularVehicles.defaultProps = {
  title: null,
  maxLots: 5,
  isInline: false,
};

PopularVehicles.propTypes = {
  isIntlPage: PropTypes.bool.isRequired,
  title: PropTypes.string,
  maxLots: PropTypes.number,
  isInline: PropTypes.bool,
};

export default PopularVehicles;
