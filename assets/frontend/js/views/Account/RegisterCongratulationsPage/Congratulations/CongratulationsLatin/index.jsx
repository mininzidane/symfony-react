import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import Page from '../../Shared/Page';

const CongratulationsLatin = ({ country }) => (
  <Page
    features={[
      <FormattedMessage id="registerCongratulations.features.feature1" />,
      <FormattedMessage
        id="registerCongratulations.features.feature2"
        values={{
          countryName: country,
        }}
      />,
      <FormattedMessage id="registerCongratulations.features.feature3" />,
      <FormattedMessage id="registerCongratulations.features.feature4" />,
    ]}
    descriptions={[
      <FormattedMessage id="registerCongratulations.descriptions.description1" />,
      <FormattedMessage
        id="registerCongratulations.descriptions.description2"
        values={{
          em: (chunks) => <em style={{ color: '#4B5158' }}>{chunks}</em>,
          minDeposit: BuyerPowerService.minDepositAmount,
          maxBid: BuyerPowerService.minDepositThreshold,
        }}
      />,
      <FormattedMessage
        id="registerCongratulations.descriptions.description3"
        values={{
          em: (chunks) => <em style={{ color: '#4B5158' }}>{chunks}</em>,
          br: <br />,
        }}
      />,
    ]}
    country={country}
  />
);

CongratulationsLatin.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CongratulationsLatin;
