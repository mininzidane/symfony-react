import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import ButtonLink from 'frontend/js/components/ButtonLink';

function FutureSale({ auction }) {
  const { location } = auction;

  return (
    <ButtonLink
      href={RouterService.getRoute('searchResultsLocation', { sale_date: 'Future' }, false, {
        slug: location.slug,
      })}
      label={<FormattedMessage id="auctionsCalendar.label.future" />}
    />
  );
}

FutureSale.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default FutureSale;
