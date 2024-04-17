import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Amount from 'frontend/js/components/Amount';
import Page from '../../Shared/Page';
import ContactUs from './ContactUsUa';

const CongratulationsUa = ({ country }) => {
  const { membershipType } = useCustomerHelper();
  const shippingCost = '$675';
  const demoDeposit = `$${BuyerPowerService.minDepositAmount}`;
  const demoPrice = `$${BuyerPowerService.minDepositThreshold}`;
  const demoPercentage = '10%';

  return (
    <Page
      features={[
        <FormattedMessage
          id="registerCongratulations.ua.features.feature1"
          values={{
            serviceFee: <Amount value={membershipType.transFeeMin} fontWeight={400} fontSize={14} hasCurrency />,
          }}
        />,
        <FormattedMessage id="registerCongratulations.ua.features.feature2" values={{ shippingCost }} />,
        <FormattedMessage id="registerCongratulations.ua.features.feature3" />,
        <FormattedMessage id="registerCongratulations.ua.features.feature4" />,
      ]}
      descriptions={[
        <FormattedMessage
          id="registerCongratulations.ua.descriptions.description1"
          values={{ demoPercentage, demoPrice, demoDeposit }}
        />,
        <FormattedMessage id="registerCongratulations.ua.descriptions.description2" />,
        <FormattedMessage id="registerCongratulations.ua.descriptions.description3" />,
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
