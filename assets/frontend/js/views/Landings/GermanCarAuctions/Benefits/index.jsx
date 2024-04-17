/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Amount from 'frontend/js/components/Amount';
import CarPng from './img/car.svg';
import TimeSvg from './img/time.svg';
import MoneySvg from './img/money.svg';
import useStyles from './useStyles';

function Benefits() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="homePage.intl.benefits.title" />
        </h2>

        <div className={classes.grid}>
          <div className={classes.benefit}>
            <div className={classes.icon}>
              <img src={TimeSvg} alt="Fast delivery" />
            </div>
            <div className={classes.caption}>
              <FormattedMessage id="germanCarAuctionsPage.benefits.benefit1.title" />
            </div>
            <div className={classes.desc}>
              <FormattedMessage id="germanCarAuctionsPage.benefits.benefit1.desc" />
            </div>
          </div>

          <div className={classes.benefit}>
            <div className={classes.icon}>
              <img src={MoneySvg} alt="Low cost delivery" />
            </div>
            <div className={classes.caption}>
              <FormattedMessage id="germanCarAuctionsPage.benefits.benefit2.title" />
            </div>
            <div className={classes.desc}>
              <FormattedMessage
                id="germanCarAuctionsPage.benefits.benefit2.desc"
                values={{ amount: <Amount fontWeight={400} value={299} /> }}
              />
            </div>
          </div>

          <div className={classes.benefit}>
            <div className={classes.icon}>
              <img src={CarPng} width={58} height={50} alt="Cars in good condition" />
            </div>
            <div className={classes.caption}>
              <FormattedMessage id="germanCarAuctionsPage.benefits.benefit3.title" />
            </div>
            <div className={classes.desc}>
              <FormattedMessage id="germanCarAuctionsPage.benefits.benefit3.desc" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
