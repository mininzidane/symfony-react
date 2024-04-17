import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import CarSvg from './img/ic_sell_your_car.svg';
import useStyles from './useStyles';

function SellYourCar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={CarSvg} alt="Car" className={classes.icon} />
      <strong>
        <FormattedMessage id="header.main_menu.sell_your_car" />
      </strong>

      <Link href={RouterService.getRoute('sellYourCar')} className={classes.link} isTargetBlank>
        <FormattedMessage id="shared.cta.learnMore" />
      </Link>
    </div>
  );
}

export default SellYourCar;
