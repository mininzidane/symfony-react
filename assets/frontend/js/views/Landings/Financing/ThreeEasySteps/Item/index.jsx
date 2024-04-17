import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';

import img1 from './img/bg1.png';
import img2 from './img/bg2.png';
import img3 from './img/bg3.png';
import icon1 from './img/payments.svg';
import icon2 from './img/bids.svg';
import icon3 from './img/carFinder.svg';
import useStyles from './useStyles';

function Item({ type }) {
  const classes = useStyles();

  const types = [
    {
      img: img1,
      icon: icon1,
      badge: 1,
      title: <FormattedMessage id="landings.financing.threeEasySteps.cards.card1.title" />,
      text: <FormattedMessage id="landings.financing.threeEasySteps.cards.card1.text" />,
    },
    {
      img: img2,
      icon: icon2,
      badge: 2,
      title: <FormattedMessage id="landings.financing.threeEasySteps.cards.card2.title" />,
      text: <FormattedMessage id="landings.financing.threeEasySteps.cards.card2.text" />,
    },
    {
      img: img3,
      icon: icon3,
      badge: 3,
      title: <FormattedMessage id="landings.financing.threeEasySteps.cards.card3.title" />,
      text: <FormattedMessage id="landings.financing.threeEasySteps.cards.card3.text" />,
    },
  ];

  return (
    <div className={classes.root}>
      <div
        className={classes.img}
        style={{ background: `url("${types[type].img}") center center / cover no-repeat, transparent` }}
      >
        <div className={classes.icon} style={{ backgroundImage: `url("${types[type].icon}")` }}>
          <div className={classes.badge}>{types[type].badge}</div>
        </div>
      </div>
      <div className={classes.title}>{types[type].title}</div>
      <div className={classes.text}>{types[type].text}</div>
    </div>
  );
}

Item.propTypes = {
  type: PropTypes.number.isRequired,
};

export default Item;
