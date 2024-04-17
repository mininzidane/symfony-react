import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import LotService from 'frontend/js/api/LotService';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import RouterService from 'frontend/js/api/RouterService';
import LanguageService from 'frontend/js/api/LanguageService';
import Link from 'frontend/js/components/Link';
import Group from './Group';

function Body({ vin }) {
  const { data, isLoading } = useQuery(['vin-details-data', vin], () => LotService.getVinDetails(vin));

  if (!data && isLoading) {
    return <SpinnerWheel isCentered size={40} thickness={3} />;
  }

  const noData = !get(data, 'data');
  if (!isLoading && noData) {
    return (
      <div className="text-red">
        <FormattedMessage id="lotPage.details.vinDetails.modal.error" />
      </div>
    );
  }

  const generalItems = get(data, 'data.general', {});
  const trimItems = get(data, 'data.trim', {});

  const clearvinUrlParams = {
    vin,
    utm_source: 'abm_site',
    utm_medium: 'abm_cross_sell',
    utm_campaign: 'lot_page_vin',
    utm_content: 'vin_check',
  };

  const clearvinLocale = LanguageService.getClearvinSupportedLocale();
  const clearvinUrl = RouterService.getRoute('clearvinPayment', clearvinUrlParams, true, { locale: clearvinLocale });

  return (
    <>
      <div className="text-md">
        <FormattedMessage
          id="lotPage.details.vinDetails.modal.disclaimer"
          values={{
            a: (chunks) => (
              <Link isTargetBlank isNofollow href={clearvinUrl}>
                {chunks}
              </Link>
            ),
          }}
        />
      </div>
      <Group entries={generalItems} title={<FormattedMessage id="lotPage.details.vinDetails.modal.general" />} />
      <Group entries={trimItems} title={<FormattedMessage id="lotPage.details.vinDetails.modal.trim" />} />
    </>
  );
}

Body.propTypes = {
  vin: PropTypes.string.isRequired,
};

export default Body;
