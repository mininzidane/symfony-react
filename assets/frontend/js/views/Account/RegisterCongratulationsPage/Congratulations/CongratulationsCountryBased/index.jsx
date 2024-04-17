import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Page from '../../Shared/Page';

const CongratulationsCountryBased = ({ country }) => {
  const { depositToBuyerPowerRatio, minDepositAmount, minDepositThreshold } = BuyerPowerService;
  const { membershipType } = useCustomerHelper();

  return (
    <Page
      subtitle={
        <FormattedMessage
          id="registerCongratulations.countryBased.subtitle"
          values={{ br: <br className="sm-up-hide" />, country }}
        />
      }
      features={[
        <FormattedMessage
          id="registerCongratulations.countryBased.features.feature1"
          values={{ fee: membershipType.transFeeMin }}
        />,
        <FormattedMessage id="registerCongratulations.countryBased.features.feature2" values={{ country }} />,
        <FormattedMessage id="registerCongratulations.countryBased.features.feature3" />,
        <FormattedMessage id="registerCongratulations.countryBased.features.feature4" />,
      ]}
      descriptions={[
        <FormattedMessage id="registerCongratulations.countryBased.descriptions.description1" />,
        <FormattedMessage
          id="registerCongratulations.countryBased.descriptions.description2"
          values={{
            em: (chunks) => <em style={{ color: '#4B5158' }}>{chunks}</em>,
            minDepositAmount,
            minDepositThreshold: NumberService.formatNumber(minDepositThreshold),
            depositAmountOnTwoLots: minDepositAmount * 2,
            depositThresholdOnTwoLots: NumberService.formatNumber(minDepositAmount * 2 * depositToBuyerPowerRatio),
          }}
        />,
        <FormattedMessage
          id="registerCongratulations.countryBased.descriptions.description3"
          values={{ em: (chunks) => <em style={{ color: '#4B5158' }}>{chunks}</em> }}
        />,
      ]}
      country={country}
    />
  );
};

CongratulationsCountryBased.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CongratulationsCountryBased;
