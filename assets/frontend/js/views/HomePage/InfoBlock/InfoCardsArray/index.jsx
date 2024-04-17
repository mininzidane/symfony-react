import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import Card from '../Card';
import card1JPG from '../img/card1.jpg';
import card2JPG from '../img/card2.jpg';
import card3JPG from '../img/card3.jpg';
import card4JPG from '../img/card4.jpg';

const { minDepositAmount, minDepositThreshold } = BuyerPowerService;
const maxBid = NumberService.formatCurrency(minDepositThreshold);
const minDeposit = NumberService.formatCurrency(minDepositAmount);

export default [
  <Card
    title={<FormattedMessage id="homePage.infoBlock.card1.title" />}
    desc={<FormattedMessage id="homePage.infoBlock.card1.desc" />}
    background={card1JPG}
  />,
  <Card
    title={<FormattedMessage id="homePage.infoBlock.card2.title" />}
    desc={<FormattedMessage id="homePage.infoBlock.card2.desc" values={{ maxBid, minDeposit }} />}
    background={card2JPG}
  />,
  <Card
    title={<FormattedMessage id="homePage.infoBlock.card3.title" />}
    desc={<FormattedMessage id="homePage.infoBlock.card3.desc" />}
    background={card3JPG}
  />,
  <Card
    title={<FormattedMessage id="homePage.infoBlock.card4.title" />}
    desc={<FormattedMessage id="homePage.infoBlock.card4.desc" />}
    background={card4JPG}
  />,
];
