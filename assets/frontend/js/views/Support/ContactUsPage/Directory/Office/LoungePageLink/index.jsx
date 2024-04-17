/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useLoungeCountry from 'frontend/js/hooks/useLoungeCountry';

function LoungePageLink({ iso2 }) {
  const loungeCountry = useLoungeCountry(iso2);

  if (!loungeCountry) {
    return null;
  }

  return (
    <Link
      href={RouterService.getRoute('lounge', null, false, { country: loungeCountry.slug })}
      style={{ display: 'block' }}
    >
      <FormattedMessage id="loungePage.lounge.title" values={{ country: loungeCountry.name }} />
    </Link>
  );
}

export default LoungePageLink;
