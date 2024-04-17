import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CountryService from 'frontend/js/api/CountryService';
import Step from '../Step';
import DepositsSvg from '../../img/deposits.svg';
import BidsSvg from '../../img/bids.svg';
import TransportationSvg from '../../img/transportation.svg';
import CustomsClearanceSvg from '../../img/customs_clearance.svg';
import useStyles from './useStyles';

function StepsBelow({ country }) {
  const intl = useIntl();
  const classes = useStyles();
  const isElSalvador = country === CountryService.COUNTRIES.elSalvador.name;

  return (
    <div className={classes.root}>
      <Step
        imageSrc={DepositsSvg}
        title={`${intl.formatMessage({ id: 'shared.time.day' })} 1-2`}
        desc={<FormattedMessage id="homePage.intl.howToBuyAndShip.signAContract" />}
        isOpposite
        isShort
      />
      <Step
        imageSrc={BidsSvg}
        title={`${intl.formatMessage({ id: 'shared.time.day' })} 3-4`}
        desc={<FormattedMessage id="homePage.intl.howToBuyAndShip.biddingAtAuction" />}
        isOpposite
      />
      <Step
        imageSrc={TransportationSvg}
        title={`${intl.formatMessage({ id: 'shared.time.day' })} 6-10`}
        desc={<FormattedMessage id="homePage.intl.howToBuyAndShip.groundShipping" />}
        isOpposite
      />
      <Step
        imageSrc={CustomsClearanceSvg}
        title={`${intl.formatMessage({ id: 'shared.time.day' })} ${isElSalvador ? '40-45' : '60-65'}`}
        desc={<FormattedMessage id="homePage.intl.howToBuyAndShip.customsClearance" />}
        isOpposite
      />
    </div>
  );
}

StepsBelow.propTypes = {
  country: PropTypes.string,
};

StepsBelow.defaultProps = {
  country: '',
};

export default StepsBelow;
