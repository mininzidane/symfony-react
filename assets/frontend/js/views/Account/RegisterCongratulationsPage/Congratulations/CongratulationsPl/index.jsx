import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Amount from 'frontend/js/components/Amount';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Page from '../../Shared/Page';

const CongratulationsPl = ({ country }) => {
  const { membershipType } = useCustomerHelper();
  const demoDeposit = `$${BuyerPowerService.minDepositAmount}`;
  const demoPrice = `$${BuyerPowerService.minDepositThreshold}`;

  return (
    <Page
      subtitle={<FormattedMessage id="registerCongratulations.pl.subtitle" />}
      features={[
        <FormattedMessage
          id="registerCongratulations.pl.features.feature1"
          values={{
            transactionFee: <Amount value={membershipType.transFeeMin} fontWeight={400} fontSize={14} hasCurrency />,
            percentage: `${membershipType.transFeePerc}%`,
          }}
        />,
        <FormattedMessage id="registerCongratulations.pl.features.feature2" />,
        <FormattedMessage id="registerCongratulations.pl.features.feature3" />,
        <FormattedMessage id="registerCongratulations.pl.features.feature4" />,
      ]}
      descriptions={[
        <FormattedMessage id="registerCongratulations.pl.descriptions.description1" />,
        <FormattedMessage
          id="registerCongratulations.pl.descriptions.description2"
          values={{
            demoDeposit,
            demoPrice,
            minDeposit: <Amount value={BuyerPowerService.minDepositAmount} hasCurrency />,
            i: (chunks) => <i>{chunks}</i>,
          }}
        />,
        <FormattedMessage
          id="registerCongratulations.pl.descriptions.description3"
          values={{ i: (chunks) => <i>{chunks}</i> }}
        />,
      ]}
      country={country}
    />
  );
};

CongratulationsPl.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CongratulationsPl;
