/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BootstrapService from 'frontend/js/api/BootstrapService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Card from 'frontend/js/components/Card';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import useStyles from './useStyles';
import ArrowSvg from './img/arrow.svg';

function Shipping({ destinationName, quotes }) {
  const classes = useStyles();
  const countryName = BootstrapService.getAppValue('countryName');
  const portsOrder = [
    'New Jersey, NJ',
    'Savannah, GA',
    'Miami, FL',
    'Houston, TX',
    'Los Angeles, CA',
    'Seattle, WA',
    'Chicago, IL',
    'Toronto, ON',
    'San Pablo, CA',
    'Jacksonville, FL',
    'Fort Lauderdale, FL',
    'Montreal, QC',
    'Pasadena, TX',
    'Baltimore, MD',
    'Tacoma, WA',
  ];

  function getCardRow(city, port, price) {
    return (
      <div className={classes.cardRow} key={city}>
        <div className={classes.city}>{city}</div>
        <img src={ArrowSvg} className={classes.arrow} alt="Arrow" />
        <div className={classes.port}>{port}</div>
        <div className={classes.price}>
          <strong>{NumberService.formatCurrency(price)}</strong> USD
        </div>
      </div>
    );
  }

  function getListedPorts() {
    return portsOrder.map((port) => {
      const matchingPort = quotes.find((qoute) => qoute.port_name === port);

      return matchingPort ? getCardRow(matchingPort.port_name, destinationName, matchingPort.ocean_quote) : null;
    });
  }

  function getUnlistedPorts() {
    return quotes.map((port) =>
      portsOrder.includes(port.port_name) ? null : getCardRow(port.port_name, destinationName, port.ocean_quote),
    );
  }

  return (
    <div className={classes.root}>
      <SectionTitle text={<FormattedMessage id="homePage.intl.shipping.title" values={{ countryName }} />} />

      <div className={classes.subtilte}>
        <FormattedMessage id="homePage.intl.shipping.subtitle" values={{ countryName }} />
      </div>

      <div className={classes.cardContainer}>
        {quotes && (
          <Card className={classes.card}>
            <div className={classes.cardTitle}>
              <div>
                <FormattedMessage id="shared.label.nearestPort" />
              </div>
              <div>
                <FormattedMessage id="shared.label.shippingPrice" />
              </div>
            </div>

            <div>
              {getListedPorts()}
              {getUnlistedPorts()}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Shipping;
