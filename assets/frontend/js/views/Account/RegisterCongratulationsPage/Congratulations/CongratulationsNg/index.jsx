import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import Page from '../../Shared/Page';

const CongratulationsNg = ({ country }) => {
  const demoDeposit = `$${BuyerPowerService.minDepositAmount}`;
  const demoPrice = `$${BuyerPowerService.minDepositThreshold}`;

  return (
    <Page
      subtitle={
        <FormattedMessage id="registerCongratulations.ng.subtitle" values={{ br: <br className="sm-up-hide" /> }} />
      }
      features={[
        <FormattedMessage id="registerCongratulations.ng.features.feature1" />,
        <FormattedMessage id="registerCongratulations.ng.features.feature2" />,
        <FormattedMessage id="registerCongratulations.ng.features.feature3" />,
        <FormattedMessage id="registerCongratulations.ng.features.feature4" />,
      ]}
      descriptions={[
        <FormattedMessage id="registerCongratulations.ng.descriptions.description1" />,
        <FormattedMessage
          id="registerCongratulations.ng.descriptions.description2"
          values={{ em: (chunks) => <em style={{ color: '#4B5158' }}>{chunks}</em>, demoDeposit, demoPrice }}
        />,
        <FormattedMessage
          id="registerCongratulations.ng.descriptions.description3"
          values={{ em: (chunks) => <em style={{ color: '#4B5158' }}>{chunks}</em> }}
        />,
      ]}
      country={country}
    />
  );
};

CongratulationsNg.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CongratulationsNg;
