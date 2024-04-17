import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import ButtonLink from 'frontend/js/components/ButtonLink';

function NextSale({ auction }) {
  const { location, nextSaleDate } = auction;

  if (!nextSaleDate) {
    return null;
  }

  return (
    <ButtonLink
      href={RouterService.getRoute('searchResultsAuctionDate', null, false, {
        slug: location.slug,
        date: DateTimeService.format(DateTimeService.parseDateInLocalTimezone(nextSaleDate), 'yyyyMMdd'),
      })}
      label={<strong>{DateTimeService.format(new Date(nextSaleDate))}</strong>}
    />
  );
}

NextSale.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default NextSale;
