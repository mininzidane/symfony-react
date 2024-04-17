import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Amount from 'frontend/js/components/Amount';
import Page from '../../Shared/Page';
import ContactUs from './ContactUs';

const CongratulationsUa = ({ country }) => {
  const { membershipType } = useCustomerHelper();
  const demoDeposit = `$${BuyerPowerService.minDepositAmount}`;
  const demoPrice = `$${BuyerPowerService.minDepositThreshold}`;
  const demoPercentage = '10%';

  return (
    <Page
      subtitle={<FormattedMessage id="registerCongratulations.ru.subtitle" />}
      features={[
        <FormattedMessage
          id="registerCongratulations.ru.features.feature1"
          values={{
            transactionFee: <Amount value={membershipType.transFeeMin} fontWeight={400} fontSize={14} hasCurrency />,
            percentage: `${membershipType.transFeePerc}%`,
          }}
        />,
        <FormattedMessage id="registerCongratulations.ru.features.feature2" />,
        <FormattedMessage id="registerCongratulations.ru.features.feature3" />,
        <FormattedMessage id="registerCongratulations.ru.features.feature4" />,
      ]}
      descriptions={[
        <FormattedMessage id="registerCongratulations.ru.descriptions.description1" />,
        <FormattedMessage
          id="registerCongratulations.ru.descriptions.description2"
          values={{ demoPercentage, demoPrice, demoDeposit }}
        />,
        <FormattedMessage id="registerCongratulations.ru.descriptions.description3" />,
        <FormattedMessage id="registerCongratulations.ru.descriptions.description4" />,
      ]}
      contactUs={<ContactUs />}
      country={country}
    />
  );
};

CongratulationsUa.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CongratulationsUa;
