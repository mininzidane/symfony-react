/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Amount from 'frontend/js/components/Amount';
import CopartSvg from './img/copart.svg';
import LiveBiddingSvg from './img/live_bidding.svg';
import ServicesSvg from './img/services.svg';
import ShippingSvg from './img/shipping.svg';
import useStyles from './useStyles';
import Benefit from './Benefit';

function Benefits({ countryName }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="homePage.intl.benefits.title" />
        </h2>

        <div className={classes.grid}>
          <Benefit
            icon={CopartSvg}
            title={<FormattedMessage id="loungePage.benefits.benefit1.title" />}
            desc={<FormattedMessage id="loungePage.benefits.benefit1.desc" values={{ country: countryName }} />}
          />

          <Benefit
            icon={ShippingSvg}
            title={<FormattedMessage id="loungePage.benefits.benefit2.title" />}
            desc={<FormattedMessage id="loungePage.benefits.benefit2.desc" />}
          />

          <Benefit
            icon={ServicesSvg}
            title={<FormattedMessage id="loungePage.benefits.benefit3.title" />}
            desc={
              <FormattedMessage
                id="loungePage.benefits.benefit3.desc"
                values={{ amount: <Amount fontWeight={400} value={299} /> }}
              />
            }
          />

          <Benefit
            icon={LiveBiddingSvg}
            title={<FormattedMessage id="loungePage.benefits.benefit4.title" />}
            desc={<FormattedMessage id="loungePage.benefits.benefit4.desc" />}
          />
        </div>
      </div>
    </div>
  );
}

export default Benefits;
