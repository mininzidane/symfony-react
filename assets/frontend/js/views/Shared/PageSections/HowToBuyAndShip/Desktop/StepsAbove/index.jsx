import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useOceanQuotes from 'frontend/js/hooks/useOceanQuotes';
import CountryService from 'frontend/js/api/CountryService';
import Step from '../Step';
import DocumentsIdSvg from '../../img/documents_id.svg';
import CarFinderSvg from '../../img/car_finder.svg';
import PaymentsSvg from '../../img/payments.svg';
import ShippingSvg from '../../img/shipping.svg';
import useStyles from './useStyles';

function StepsAbove({ country }) {
  const intl = useIntl();
  const classes = useStyles();
  const { destination: port } = useOceanQuotes();
  const isElSalvador = country === CountryService.COUNTRIES.elSalvador.name;

  return (
    <div className={classes.root}>
      <Step
        imageSrc={DocumentsIdSvg}
        title={`${intl.formatMessage({ id: 'shared.time.day' })} 1`}
        desc={<FormattedMessage id="homePage.intl.howToBuyAndShip.registerWithUs" />}
      />
      <Step
        imageSrc={CarFinderSvg}
        title={`${intl.formatMessage({ id: 'shared.time.day' })} 2-3`}
        desc={<FormattedMessage id="homePage.intl.howToBuyAndShip.findYourVehicle" />}
      />
      <Step
        imageSrc={PaymentsSvg}
        title={`${intl.formatMessage({ id: 'shared.time.day' })} 4-6`}
        desc={<FormattedMessage id="homePage.intl.howToBuyAndShip.paymentForYour" />}
      />
      <Step
        imageSrc={ShippingSvg}
        title={`${intl.formatMessage({ id: 'shared.time.day' })} 10-${isElSalvador ? '40' : '60'}`}
        desc={
          <FormattedMessage
            id="homePage.intl.howToBuyAndShip.oceanShipping"
            values={{ port: port ? port.name : country }}
          />
        }
        isShort
      />
    </div>
  );
}

StepsAbove.propTypes = {
  country: PropTypes.string,
};

StepsAbove.defaultProps = {
  country: '',
};

export default StepsAbove;
