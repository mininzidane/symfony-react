import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import Page from '../../Shared/Page';
import ContactUs from './ContactUsBy';

const CongratulationsBy = ({ country }) => {
  const demoExampleDeposit = `$${BuyerPowerService.minDepositAmount * 2}`;
  const demoExamplePrice = `$${BuyerPowerService.minDepositThreshold * 2}`;
  const demoPercentage = '10%';
  const demoDepositMin = '$300';

  return (
    <Page
      subtitle={<FormattedMessage id="registerCongratulations.by.subtitle" />}
      features={[
        <FormattedMessage id="registerCongratulations.by.features.feature1" />,
        <FormattedMessage id="registerCongratulations.by.features.feature2" />,
        <FormattedMessage id="registerCongratulations.by.features.feature3" />,
        <FormattedMessage id="registerCongratulations.by.features.feature4" />,
      ]}
      descriptions={[
        <FormattedMessage id="registerCongratulations.by.descriptions.description1" />,
        <FormattedMessage
          id="registerCongratulations.by.descriptions.description2"
          values={{ demoPercentage, demoDepositMin, demoExamplePrice, demoExampleDeposit }}
        />,
        <FormattedMessage id="registerCongratulations.by.descriptions.description3" />,
        <FormattedMessage id="registerCongratulations.by.descriptions.description4" />,
      ]}
      contactUs={<ContactUs />}
      country={country}
    />
  );
};

CongratulationsBy.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CongratulationsBy;
