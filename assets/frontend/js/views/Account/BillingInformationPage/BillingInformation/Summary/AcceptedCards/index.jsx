import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import MastercardSvg from 'frontend/images/shared/cards-icons/logo-mastercard.svg';
import VisaSvg from 'frontend/images/shared/cards-icons/logo-visa.svg';
import AmexSvg from 'frontend/images/shared/cards-icons/logo-amex.svg';
import DiscoverSvg from 'frontend/images/shared/cards-icons/logo-discover.svg';
import useStyles from './useStyles';

function AcceptedCards() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage id="billingInformationPage.weAcceptAllMajorCreditCards" />
      </div>
      <div className={classes.cards}>
        <img src={MastercardSvg} alt="Mastercard" />
        <img src={AmexSvg} alt="Amex" />
        <img src={VisaSvg} alt="Visa" />
        <img src={DiscoverSvg} alt="Discover" />
      </div>
    </div>
  );
}

export default AcceptedCards;
