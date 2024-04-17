import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import Page from '../../Shared/Page';
import ContactUs from './ContactUs';

const CongratulationsGe = ({ country }) => {
  const demoDeposit = `$${BuyerPowerService.minDepositAmount}`;
  const demoPrice = `$${BuyerPowerService.minDepositThreshold}`;
  const demoPercentage = '10%';

  return (
    <Page
      subtitle={<FormattedMessage id="registerCongratulations.ge.subtitle" />}
      features={[
        <FormattedMessage id="registerCongratulations.ge.features.feature1" />,
        <FormattedMessage id="registerCongratulations.ge.features.feature2" />,
        <FormattedMessage id="registerCongratulations.ge.features.feature3" />,
        <FormattedMessage id="registerCongratulations.ge.features.feature4" />,
      ]}
      descriptions={[
        <FormattedMessage id="registerCongratulations.ge.descriptions.description1" />,
        <FormattedMessage
          id="registerCongratulations.ge.descriptions.description2"
          values={{ demoPercentage, demoPrice, demoDeposit }}
        />,
        <FormattedMessage id="registerCongratulations.ge.descriptions.description3" />,
        <FormattedMessage id="registerCongratulations.ge.descriptions.description4" />,
      ]}
      contactUs={<ContactUs />}
      country={country}
    />
  );
};

CongratulationsGe.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CongratulationsGe;
