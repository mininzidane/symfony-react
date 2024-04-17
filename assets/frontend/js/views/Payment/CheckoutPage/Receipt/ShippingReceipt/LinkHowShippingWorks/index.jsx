import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import CountryService from 'frontend/js/api/CountryService';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';

function LinkHowShippingWorks() {
  const intl = useIntl();
  const { isDomestic } = CountryService;

  const translationSets = {
    howShippingWorks: intl.formatMessage({ id: 'receiptPage.howShippingWorks' }),
  };

  return (
    <div className="ta-c text-md pt-15">
      <Link
        href={
          isDomestic()
            ? RouterService.getRoute('howDomesticShippingWorks')
            : RouterService.getRoute('howInternationalShippingWorks')
        }
      >
        {translationSets.howShippingWorks}
      </Link>
    </div>
  );
}

export default LinkHowShippingWorks;
